from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Inventory, StockMovement
from .serializers import (
    InventorySerializer,
    StockMovementSerializer,
)


class InventoryListView(generics.ListAPIView):
    queryset = Inventory.objects.select_related("product")
    serializer_class = InventorySerializer
    permission_classes = [AllowAny]


class StockMovementListView(generics.ListAPIView):
    queryset = StockMovement.objects.select_related(
        "inventory__product"
    )
    serializer_class = StockMovementSerializer
    permission_classes = [AllowAny]

class AddStockView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, pk):
        try:
            inventory = Inventory.objects.get(pk=pk)

            quantity = int(request.data.get("quantity", 0))
            note = request.data.get("note", "")

            if quantity <= 0:
                return Response(
                    {"error": "Quantity must be greater than zero."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            inventory.add_stock(quantity, note)

            return Response(
                {"message": "Stock added successfully."},
                status=status.HTTP_200_OK,
            )

        except Inventory.DoesNotExist:
            return Response(
                {"error": "Inventory not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

class RemoveStockView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, pk):
        try:
            inventory = Inventory.objects.get(pk=pk)

            quantity = int(request.data.get("quantity", 0))
            note = request.data.get("note", "")

            if quantity <= 0:
                return Response(
                    {"error": "Quantity must be greater than zero."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            inventory.remove_stock(quantity, note)

            return Response(
                {"message": "Stock removed successfully."},
                status=status.HTTP_200_OK,
            )

        except ValueError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        except Inventory.DoesNotExist:
            return Response(
                {"error": "Inventory not found."},
                status=status.HTTP_404_NOT_FOUND,
            )