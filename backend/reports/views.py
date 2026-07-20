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