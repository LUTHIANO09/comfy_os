from django.db.models import Sum
from django.db.models.functions import TruncMonth
from django.utils import timezone
from datetime import timedelta

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

        total_sales = (
            sales_queryset
            .aggregate(total=Sum("total_amount"))
            .get("total")
            or 0
        )

        total_expenses = (
            expense_queryset
            .aggregate(total=Sum("amount"))
            .get("total")
            or 0
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
            .annotate(total=Sum("total_amount"))
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
            item["month"].strftime("%b"): item["total"]
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
            monthly_summary.append({
                "month": month,
                "sales": sales_dict.get(month, 0),
                "expenses": expense_dict.get(month, 0),
            })

        return Response({
            "total_sales": total_sales,
            "total_expenses": total_expenses,
            "net_profit": total_sales - total_expenses,
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
        })