from django.contrib import admin
from .models import Supplier


@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "company",
        "phone",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
    )

    search_fields = (
        "name",
        "company",
        "phone",
        "email",
    )

    ordering = (
        "name",
    )