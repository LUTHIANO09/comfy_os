from django.db import models

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

        data = {
            "products": Product.objects.count(),
            "sales": Sale.objects.count(),
            "revenue": 0,
            "customers": 0,

            # New dashboard cards
            "total_stock": total_stock,
            "low_stock_items": low_stock.count(),
            "inventory_value": inventory_value,

            # Existing data
            "low_stock": low_stock_data,
            "recent_sales": [],
        }

        return Response(data)