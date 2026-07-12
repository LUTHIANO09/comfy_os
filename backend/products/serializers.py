from rest_framework import serializers
from .models import Category, Product
from inventory.models import Inventory


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    class Meta:
        model = Product
        fields = "__all__"

    def create(self, validated_data):
        product = Product.objects.create(**validated_data)

        Inventory.objects.create(
            product=product,
            quantity=0,
            low_stock_threshold=5,
        )

        return product