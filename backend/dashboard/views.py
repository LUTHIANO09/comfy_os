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

        data = {
            "products": Product.objects.count(),
            "sales": Sale.objects.count(),
            "revenue": 0,
            "customers": 0,
            "low_stock": low_stock_data,
            "recent_sales": [],
        }

        return Response(data)