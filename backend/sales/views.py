from rest_framework import generics

from .serializers import SaleSerializer

from decimal import Decimal

from django.db import transaction
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from products.models import Product
from inventory.models import Inventory, StockMovement

from .models import Sale, SaleItem
from .serializers import CheckoutSerializer

from accounts.models import User

from django.shortcuts import get_object_or_404

from django.db.models import Sum, Avg
from django.utils import timezone
from django.db.models import Q




class SaleListCreateView(generics.ListCreateAPIView):
    serializer_class = SaleSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Sale.objects.all().order_by("-created_at")

        receipt = self.request.query_params.get("receipt")
        date = self.request.query_params.get("date")

        if receipt:
            queryset = queryset.filter(
                receipt_number__icontains=receipt
            )

        if date:
            queryset = queryset.filter(
                created_at__date=date
            )

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        serializer = self.get_serializer(
            queryset,
            many=True
        )

        revenue = (
            queryset.aggregate(
                total=Sum("total_amount")
            )["total"] or 0
        )

        average_sale = (
            queryset.aggregate(
                avg=Avg("total_amount")
            )["avg"] or 0
        )

        today_sales = queryset.filter(
            created_at__date=timezone.now().date()
        ).count()

        return Response({
            "summary": {
                "total_revenue": revenue,
                "total_sales": queryset.count(),
                "average_sale": average_sale,
                "today_sales": today_sales,
            },
            "sales": serializer.data,
        })

class SaleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    permission_classes = [AllowAny]

class CheckoutView(APIView):
    permission_classes = [AllowAny]

    @transaction.atomic
    def post(self, request):

        serializer = CheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        receipt_number = f"SALE-{timezone.now().strftime('%Y%m%d%H%M%S')}"

        cashier = User.objects.first()

        sale = Sale.objects.create(
            receipt_number=receipt_number,
            cashier=cashier,
            payment_method=data["payment_method"],
            discount=data["discount"],
            status=Sale.Status.COMPLETED,
        )

        for item in data["items"]:

            product = get_object_or_404( Product, pk=item["product"]
            )

            inventory = get_object_or_404( Inventory.objects.select_for_update(), product=product
            )

            if inventory.quantity < item["quantity"]:
                return Response(
                    {
                        "error": f"Not enough stock for {product.name}"
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            SaleItem.objects.create(
                sale=sale,
                product=product,
                quantity=item["quantity"],
                unit_price=product.selling_price,
            )

            inventory.quantity -= item["quantity"]
            inventory.save()

            StockMovement.objects.create(
                inventory=inventory,
                movement_type=StockMovement.MovementType.SALE,
                quantity=item["quantity"],
                note=f"Sale {sale.receipt_number}",
            )

        sale.calculate_totals()
        sale.save()

        return Response(
            {
                "message": "Sale completed successfully.",
                "receipt_number": sale.receipt_number,
            },
            status=status.HTTP_201_CREATED,
        )