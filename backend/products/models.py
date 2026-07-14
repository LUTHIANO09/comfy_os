from django.db import models
from decimal import Decimal



class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="products"
    )

    name = models.CharField(max_length=150)
    sku = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    cost_price = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    markup_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0
    )

    selling_price = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    is_active = models.BooleanField(default=True)

    image = models.ImageField(
        upload_to="products/",
        blank=True,
        null=True
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def calculate_pricing(self):
        if self.cost_price <= 0:
            return

        calculated_price = self.cost_price * (
            Decimal("1") + self.markup_percentage / Decimal("100")
        )

        if self.selling_price != calculated_price:
            self.markup_percentage = (
                (self.selling_price - self.cost_price)
                / self.cost_price
            ) * Decimal("100")
        else:
            self.selling_price = calculated_price

    def save(self, *args, **kwargs):
        self.calculate_pricing()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name