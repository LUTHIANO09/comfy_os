from rest_framework import serializers
from .models import Sale, SaleItem


class SaleItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(
        source="product.name",
        read_only=True,
    )

    class Meta:
        model = SaleItem
        fields = "__all__"


class SaleSerializer(serializers.ModelSerializer):
    items = SaleItemSerializer(
        many=True,
        read_only=True,
    )

    cashier_name = serializers.SerializerMethodField()


    payment_method_display = serializers.CharField(
    source="get_payment_method_display",
    read_only=True,
    )

    status_display = serializers.CharField(
        source="get_status_display",
        read_only=True,
    )

    def get_cashier_name(self, obj):
        if hasattr(obj.cashier, "full_name") and obj.cashier.full_name:
            return obj.cashier.full_name

        return obj.cashier.username

    class Meta:
        model = Sale
        fields = "__all__"

class CheckoutItemSerializer(serializers.Serializer):
    product = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)


class CheckoutSerializer(serializers.Serializer):
    payment_method = serializers.ChoiceField(
        choices=Sale.PaymentMethod.choices
    )

    discount = serializers.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    items = CheckoutItemSerializer(many=True)