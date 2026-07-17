from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        SALES_REP = "SALES_REP", "Sales Representative"

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.SALES_REP
    )

    phone_number = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    must_change_password = models.BooleanField(
        default=True
    )

    def __str__(self):
        return f"{self.username} ({self.role})"