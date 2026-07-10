from django.db import models
from accounts.models import User


class ExpenseCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Expense Category"
        verbose_name_plural = "Expense Categories"

    def __str__(self):
        return self.name


class Expense(models.Model):
    category = models.ForeignKey(
        ExpenseCategory,
        on_delete=models.PROTECT,
        related_name="expenses"
    )

    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    description = models.TextField(blank=True)

    created_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Expense"
        verbose_name_plural = "Expenses"

    def __str__(self):
        return f"{self.category} - ₦{self.amount}"