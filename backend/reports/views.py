from django.db.models import Sum, F, Count
from sales.models import Sale, SaleItem
from django.db.models.functions import TruncMonth
from django.utils import timezone
from datetime import timedelta
from decimal import Decimal

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from sales.models import Sale
from expenses.models import Expense
from products.models import Product
from customers.models import Customer
from inventory.models import Inventory
from sales.serializers import SaleSerializer
from expenses.serializers import ExpenseSerializer
from openpyxl import Workbook
from django.http import HttpResponse
from reportlab.platypus import (
    SimpleDocTemplate,
    Table,
    TableStyle,
    Paragraph,
)

from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from settings_app.models import Setting
from reportlab.platypus import Image


class DashboardReportView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        period = request.GET.get("period", "today")

        start_date = request.GET.get("start_date")
        end_date = request.GET.get("end_date")

        today = timezone.localdate()

        sales_queryset = Sale.objects.filter(
            status="COMPLETED"
        )

        expense_queryset = Expense.objects.all()

        if period == "today":
            sales_queryset = sales_queryset.filter(
                created_at__date=today
            )

            expense_queryset = expense_queryset.filter(
                expense_date=today
            )

        elif period == "week":
            start = today - timedelta(days=7)

            sales_queryset = sales_queryset.filter(
                created_at__date__gte=start
            )

            expense_queryset = expense_queryset.filter(
                expense_date__gte=start
            )

        elif period == "month":
            sales_queryset = sales_queryset.filter(
                created_at__year=today.year,
                created_at__month=today.month,
            )

            expense_queryset = expense_queryset.filter(
                expense_date__year=today.year,
                expense_date__month=today.month,
            )

        elif period == "year":
            sales_queryset = sales_queryset.filter(
                created_at__year=today.year
            )

            expense_queryset = expense_queryset.filter(
                expense_date__year=today.year
            )

        elif period == "custom" and start_date and end_date:
            sales_queryset = sales_queryset.filter(
                created_at__date__range=[start_date, end_date]
            )

            expense_queryset = expense_queryset.filter(
                expense_date__range=[start_date, end_date]
            )

        total_sales = (
            sales_queryset
            .aggregate(total=Sum("total_amount"))
            .get("total")
            or 0
        )

        cost_of_goods_sold = (
            SaleItem.objects
            .filter(sale__in=sales_queryset)
            .aggregate(
                total=Sum(
                    F("quantity") * F("product__cost_price")
                )
            )
            .get("total")
            or Decimal("0.00")
        )

        gross_profit = total_sales - cost_of_goods_sold

        total_expenses = (
            expense_queryset
            .aggregate(total=Sum("amount"))
            .get("total")
            or 0
        )

        net_profit = gross_profit - total_expenses

        profit_margin = (
            (gross_profit / total_sales) * 100
            if total_sales > 0
            else Decimal("0.00")
        )

        recent_sales = sales_queryset.order_by("-created_at")[:5]

        recent_expenses = expense_queryset.order_by("-created_at")[:5]

        total_products = Product.objects.count()

        total_customers = Customer.objects.count()

        low_stock = Inventory.objects.filter(
            quantity__lte=5
        ).count()

        monthly_sales = (
            sales_queryset
            .annotate(month=TruncMonth("created_at"))
            .values("month")
            .annotate(
                revenue=Sum("total_amount"),
                cost_of_goods_sold=Sum(
                    F("items__product__cost_price") * F("items__quantity")
                ),
            )
            .order_by("month")
        )

        monthly_expenses = (
            expense_queryset
            .annotate(month=TruncMonth("expense_date"))
            .values("month")
            .annotate(total=Sum("amount"))
            .order_by("month")
        )

        monthly_summary = []

        sales_dict = {
            item["month"].strftime("%b"): {
                "revenue": item["revenue"] or 0,
                "cost_of_goods_sold": item["cost_of_goods_sold"] or 0,
            }
            for item in monthly_sales
        }

        expense_dict = {
            item["month"].strftime("%b"): item["total"]
            for item in monthly_expenses
        }

        months = sorted(
            set(sales_dict.keys()) | set(expense_dict.keys()),
            key=lambda m: [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ].index(m)
        )

        for month in months:
            revenue = sales_dict.get(month, {}).get("revenue", 0)
            cost_of_goods_sold = sales_dict.get(month, {}).get("cost_of_goods_sold", 0)
            expenses = expense_dict.get(month, 0)

            monthly_summary.append({
                "month": month,
                "revenue": revenue,
                "expenses": expenses,
                "gross_profit": revenue - cost_of_goods_sold,
            })

        top_products = (
            SaleItem.objects
            .filter(sale__in=sales_queryset)
            .values("product__name")
            .annotate(
                quantity_sold=Sum("quantity"),
                revenue=Sum("total_price"),
            )
            .order_by("-quantity_sold", "-revenue")[:5]
        )

        # top_customers = (
        #     Sale.objects
        #     .filter(
        #         id__in=sales_queryset.values("id"),
        #         customer__isnull=False
        #     )
        #     .values(
        #         "customer__name"
        #     )
        #     .annotate(
        #         total_orders=Count("id"),
        #         total_spent=Sum("total_amount")
        #     )
        #     .order_by("-total_spent")[:5]
        # )

        return Response({
            "total_sales": total_sales,
            "cost_of_goods_sold": cost_of_goods_sold,
            "gross_profit": gross_profit,
            "total_expenses": total_expenses,
            "net_profit": net_profit,
            "profit_margin": round(profit_margin, 2),

            "products": total_products,
            "customers": total_customers,
            "low_stock": low_stock,

            "recent_sales": SaleSerializer(
                recent_sales,
                many=True
            ).data,

            "recent_expenses": ExpenseSerializer(
                recent_expenses,
                many=True
            ).data,

            "monthly_summary": monthly_summary,

            "top_products": list(top_products),

            # "top_customers": list(top_customers),
        })

class ExportReportExcelView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):

        settings = Setting.load()

        workbook = Workbook()
        sheet = workbook.active
        sheet.title = "Business Report"
        today = timezone.localdate()

        sales = (
            Sale.objects.filter(status="COMPLETED")
            .aggregate(total=Sum("total_amount"))
            .get("total")
            or 0
        )

        expenses = (
            Expense.objects.aggregate(total=Sum("amount"))
            .get("total")
            or 0
        )

        sheet["A1"] = settings.business_name
        sheet["A2"] = settings.business_address
        sheet["A3"] = settings.phone_number
        sheet["A4"] = settings.email
        sheet["A6"] = "Date"
        sheet["B6"] = str(today)

        sheet["A8"] = "Total Sales"
        sheet["B8"] = float(sales)

        sheet["A9"] = "Total Expenses"
        sheet["B9"] = float(expenses)

        sheet["A10"] = "Net Profit"
        sheet["B10"] = float(sales) - float(expenses)

        response = HttpResponse(
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )

        response[
            "Content-Disposition"
        ] = 'attachment; filename="business_report.xlsx"'

        workbook.save(response)

        return response

class ExportReportPDFView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):

        response = HttpResponse(
            content_type="application/pdf"
        )

        settings = Setting.load()

        response["Content-Disposition"] = (
            'attachment; filename="business_report.pdf"'
        )

        doc = SimpleDocTemplate(response)

        styles = getSampleStyleSheet()

        styles["Title"].alignment = 1
        styles["Normal"].alignment = 1

        elements = []

        # Business Logo
        if settings.logo:
            try:
                logo = Image(settings.logo.path)

                logo.drawHeight = 1.0 * inch
                logo.drawWidth = 1.0 * inch

                logo.hAlign = "CENTER"

                elements.append(logo)

            except Exception:
                pass


        elements.append(
            Paragraph(
                f"<b>{settings.business_name}</b>",
                styles["Title"],
            )
        )

        elements.append(
            Paragraph(
                settings.business_address or "",
                styles["Normal"],
            )
        )

        elements.append(
            Paragraph(
                settings.phone_number or "",
                styles["Normal"],
            )
        )

        elements.append(
            Paragraph(
                settings.email or "",
                styles["Normal"],
            )
        )

        elements.append(
            Paragraph("<br/>", styles["Normal"])
        )
        elements.append(
            Paragraph(
                f"Generated: {timezone.localdate()}",
                styles["Normal"],
            )
        )

        elements.append(
            Paragraph("<br/>", styles["Normal"])
        )

        total_sales = (
            Sale.objects.filter(status="COMPLETED")
            .aggregate(total=Sum("total_amount"))
            .get("total")
            or 0
        )

        total_expenses = (
            Expense.objects.aggregate(total=Sum("amount"))
            .get("total")
            or 0
        )

        data = [
            ["Metric", "Value"],
            ["Total Sales", f"₦{total_sales:,.2f}"],
            ["Total Expenses", f"₦{total_expenses:,.2f}"],
            [
                "Net Profit",
                f"₦{float(total_sales)-float(total_expenses):,.2f}",
            ],
        ]

        table = Table(data, colWidths=[3 * inch, 2 * inch])

        table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#2563eb")),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("GRID", (0, 0), (-1, -1), 1, colors.grey),
                    ("BACKGROUND", (0, 1), (-1, -1), colors.whitesmoke),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("BOTTOMPADDING", (0, 0), (-1, 0), 10),
                    ("TOPPADDING", (0, 1), (-1, -1), 8),
                    ("BOTTOMPADDING", (0, 1), (-1, -1), 8),
                ]
            )
        )

        elements.append(table)

        doc.build(elements)

        return response