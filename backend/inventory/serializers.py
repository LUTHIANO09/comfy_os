from rest_framework import serializers
from .models import Inventory, StockMovement


class InventorySerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product.name",
        read_only=True,
    )

    sku = serializers.CharField(
        source="product.sku",
        read_only=True,
    )

    product_image = serializers.ImageField(
        source="product.image",
        read_only=True,
    )

    class Meta:
        model = Inventory
        fields = "__all__"


class StockMovementSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(
        source="inventory.product.name",
        read_only=True
    )

    class Meta:
        model = StockMovement
        fields = "__all__"