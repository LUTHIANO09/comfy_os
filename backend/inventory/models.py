from django.db import models
from products.models import Product
from accounts.models import User
from notifications.models import Notification
from notifications.utils import create_notification


class Inventory(models.Model):
    product = models.OneToOneField(
        Product,
        on_delete=models.CASCADE,
        related_name="inventory"
    )

    quantity = models.PositiveIntegerField(default=0)

    low_stock_threshold = models.PositiveIntegerField(default=5)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Inventory"
        verbose_name_plural = "Inventories"

    def __str__(self):
        return f"{self.product.name} - {self.quantity} in stock"

    def add_stock(self, quantity, note=""):
        """
        Increase stock and record the movement.
        """
        self.quantity += quantity
        self.save()

        StockMovement.objects.create(
            inventory=self,
            movement_type=StockMovement.MovementType.ADD,
            quantity=quantity,
            note=note,
        )

    def remove_stock(self, quantity, note=""):
        """
        Decrease stock and record the movement.
        """
        if quantity > self.quantity:
            raise ValueError("Insufficient stock.")

        self.quantity -= quantity
        self.save()

        if self.quantity <= self.low_stock_threshold:

            if self.quantity <= self.low_stock_threshold:

                admins = User.objects.filter(role=User.Role.ADMIN)

                for admin in admins:

                    exists = Notification.objects.filter(
                        user=admin,
                        notification_type=Notification.NotificationType.LOW_STOCK,
                        title="Low Stock Alert",
                        message__contains=self.product.name,
                        is_read=False,
                    ).exists()

                    if not exists:
                        create_notification(
                            user=admin,
                            title="Low Stock Alert",
                            message=(
                                f"{self.product.name} is running low. "
                                f"Only {self.quantity} item(s) remaining."
                            ),
                            notification_type=Notification.NotificationType.LOW_STOCK,
                        )

        StockMovement.objects.create(
            inventory=self,
            movement_type=StockMovement.MovementType.REMOVE,
            quantity=quantity,
            note=note,
        )


class StockMovement(models.Model):

    class MovementType(models.TextChoices):
        INITIAL = "INITIAL", "Initial Stock"
        ADD = "ADD", "Stock Added"
        REMOVE = "REMOVE", "Stock Removed"
        SALE = "SALE", "Sale"
        RETURN = "RETURN", "Customer Return"
        DAMAGE = "DAMAGE", "Damaged"

    inventory = models.ForeignKey(
        Inventory,
        on_delete=models.CASCADE,
        related_name="movements"
    )

    movement_type = models.CharField(
        max_length=20,
        choices=MovementType.choices
    )

    quantity = models.PositiveIntegerField()

    note = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Stock Movement"
        verbose_name_plural = "Stock Movements"

    def __str__(self):
        return (
            f"{self.inventory.product.name} - "
            f"{self.movement_type} ({self.quantity})"
        )