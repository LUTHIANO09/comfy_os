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

from audit.utils import create_audit_log
from audit.models import AuditLog


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

            create_audit_log(
                user=request.user,
                module="Inventory",
                action=AuditLog.Action.UPDATE,
                description=(
                    f"Added {quantity} units to "
                    f"'{inventory.product.name}'"
                ),
                object_id=inventory.id,
            )

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

            create_audit_log(
                user=request.user,
                module="Inventory",
                action=AuditLog.Action.UPDATE,
                description=(
                    f"Removed {quantity} units from "
                    f"'{inventory.product.name}'"
                ),
                object_id=inventory.id,
            )

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
    def remove_stock(self, quantity, note=""):

        if quantity > self.quantity:
            raise ValueError("Insufficient stock.")

        self.quantity -= quantity
        self.save()

        print("LOW STOCK CHECK")
        print("Quantity:", self.quantity)
        print("Threshold:", self.low_stock_threshold)

        if self.quantity <= self.low_stock_threshold:

            print("LOW STOCK CONDITION PASSED")

            admins = User.objects.filter(role=User.Role.ADMIN)

            print("Admins:", admins.count())

            for admin in admins:

                print("Creating notification for:", admin.username)

                exists = Notification.objects.filter(
                    user=admin,
                    notification_type=Notification.NotificationType.LOW_STOCK,
                    title="Low Stock Alert",
                    message__contains=self.product.name,
                    is_read=False,
                ).exists()

                print("Already exists:", exists)

                if not exists:

                    create_notification(
                        user=admin,
                        title="Low Stock Alert",
                        message=f"{self.product.name} is running low. Only {self.quantity} item(s) remaining.",
                        notification_type=Notification.NotificationType.LOW_STOCK,
                    )

                    print("Notification Created!")

        StockMovement.objects.create(
            inventory=self,
            movement_type=StockMovement.MovementType.REMOVE,
            quantity=quantity,
            note=note,
        )