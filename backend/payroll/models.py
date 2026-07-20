from django.db import models
from employees.models import Employee


class PayrollPeriod(models.Model):
    month = models.PositiveSmallIntegerField()
    year = models.PositiveSmallIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("month", "year")
        ordering = ["-year", "-month"]

    def __str__(self):
        return f"{self.month}/{self.year}"


class PayrollRecord(models.Model):

    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        PAID = "PAID", "Paid"

    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name="payrolls",
    )

    period = models.ForeignKey(
        PayrollPeriod,
        on_delete=models.CASCADE,
        related_name="records",
    )

    salary = models.DecimalField(
        max_digits=12,
        decimal_places=2,
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
    )

    paid_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("employee", "period")

    def __str__(self):
        return f"{self.employee} - {self.period}"