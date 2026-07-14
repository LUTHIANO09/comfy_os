from django.db import models
from django.db.models import F


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from products.models import Product
from sales.models import Sale
from inventory.models import Inventory


class DashboardView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):

        low_stock = Inventory.objects.filter(
            quantity__lte=models.F("low_stock_threshold")
        )

        low_stock_data = [
            {
                "id": item.product.id,
                "name": item.product.name,
                "quantity": item.quantity,
            }
            for item in low_stock
        ]

        total_stock = (
            Inventory.objects.aggregate(
                total=models.Sum("quantity")
            )["total"] or 0
        )

        inventory_value = sum(
            item.quantity * item.product.cost_price
            for item in Inventory.objects.select_related("product")
        )

        category_sales = (
                    Sale.objects
                    .filter(status=Sale.Status.COMPLETED)
                    .values(
                        category=F("items__product__category__name")
                    )
                    .annotate(
                        revenue=models.Sum("items__total_price")
                    )
                    .order_by("-revenue")
                )

        data = {
            "products": Product.objects.count(),
            "sales": Sale.objects.count(),
            "revenue": (Sale.objects.aggregate(
                total=models.Sum("total_amount"))["total"] or 0),
            "customers": 0,

            # New dashboard cards
            "total_stock": total_stock,
            "low_stock_items": low_stock.count(),
            "inventory_value": inventory_value,

            # Existing data
            "low_stock": low_stock_data,
            "recent_sales": [
                        {
                            "id": sale.id,
                            "receipt": sale.receipt_number,
                            "cashier": sale.cashier.username,
                            "payment": sale.get_payment_method_display(),
                            "amount": sale.total_amount,
                            "date": sale.created_at.strftime("%d %b %Y"),
                        }
                        for sale in Sale.objects.order_by("-created_at")[:5]
                    ],

            "category_sales": list(category_sales),
        }

        return Response(data)