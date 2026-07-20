from django.db import models
from accounts.models import User
from products.models import Product


class Sale(models.Model):

    class Status(models.TextChoices):
        DRAFT = "DRAFT", "Draft"
        COMPLETED = "COMPLETED", "Completed"
        CANCELLED = "CANCELLED", "Cancelled"
        RETURNED = "RETURNED", "Returned"

    class PaymentMethod(models.TextChoices):
        CASH = "CASH", "Cash"
        POS = "POS", "POS"
        TRANSFER = "TRANSFER", "Transfer"
        MULTIPLE = "MULTIPLE", "Multiple"

    receipt_number = models.CharField(max_length=30, unique=True)

    cashier = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="sales"
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.DRAFT
    )

    payment_method = models.CharField(
        max_length=20,
        choices=PaymentMethod.choices,
        default=PaymentMethod.CASH
    )

    subtotal = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    discount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    total_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def calculate_totals(self):
        subtotal = sum(item.total_price for item in self.items.all())
        self.subtotal = subtotal
        self.total_amount = subtotal - self.discount

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Sale"
        verbose_name_plural = "Sales"

    def __str__(self):
        return self.receipt_number


class SaleItem(models.Model):
    sale = models.ForeignKey(
        Sale,
        on_delete=models.CASCADE,
        related_name="items"
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT
    )

    quantity = models.PositiveIntegerField()

    unit_price = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    total_price = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    class Meta:
        ordering = ["id"]
        verbose_name = "Sale Item"
        verbose_name_plural = "Sale Items"

    def save(self, *args, **kwargs):
        self.total_price = self.quantity * self.unit_price
        super().save(*args, **kwargs)

        self.sale.calculate_totals()
        self.sale.save(update_fields=["subtotal", "total_amount"])

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"


class SaleReturn(models.Model):
    sale = models.OneToOneField(
        Sale,
        on_delete=models.CASCADE,
        related_name="sale_return"
    )

    reason = models.TextField(blank=True)

    refund_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    returned_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="processed_returns"
    )

    returned_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["-returned_at"]
        verbose_name = "Sale Return"
        verbose_name_plural = "Sale Returns"

    def __str__(self):
        return f"Return - {self.sale.receipt_number}"