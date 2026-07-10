from django.contrib import admin
from .models import Inventory, StockMovement


@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = (
        "product",
        "quantity",
        "low_stock_threshold",
        "updated_at",
    )

    search_fields = (
        "product__name",
        "product__sku",
    )

    list_filter = (
        "low_stock_threshold",
    )

    readonly_fields = (
        "quantity",
    )


@admin.register(StockMovement)
class StockMovementAdmin(admin.ModelAdmin):
    list_display = (
        "inventory",
        "movement_type",
        "quantity",
        "created_at",
    )

    list_filter = (
        "movement_type",
    )

    search_fields = (
        "inventory__product__name",
        "inventory__product__sku",
    )

    readonly_fields = (
        "created_at",
    )

    ordering = (
        "-created_at",
    )