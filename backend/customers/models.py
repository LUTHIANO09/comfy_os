from django.db import models


class Customer(models.Model):
    full_name = models.CharField(max_length=150)

    phone_number = models.CharField(
        max_length=20,
        blank=True
    )

    email = models.EmailField(
        blank=True
    )

    address = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["full_name"]
        verbose_name = "Customer"
        verbose_name_plural = "Customers"

    def __str__(self):
        return self.full_name