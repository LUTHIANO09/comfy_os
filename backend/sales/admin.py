from django.contrib import admin
from .models import Sale, SaleItem


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = (
        "receipt_number",
        "cashier",
        "status",
        "payment_method",
        "total_amount",
        "created_at",
    )

    list_filter = (
        "status",
        "payment_method",
    )

    search_fields = (
        "receipt_number",
        "cashier__username",
    )

    ordering = (
        "-created_at",
    )


@admin.register(SaleItem)
class SaleItemAdmin(admin.ModelAdmin):
    list_display = (
        "sale",
        "product",
        "quantity",
        "unit_price",
        "total_price",
    )

    search_fields = (
        "sale__receipt_number",
        "product__name",
    )