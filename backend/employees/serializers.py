from rest_framework import serializers

from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        source="user.email",
        read_only=True
    )

    class Meta:
        model = Employee

        fields = [
            "id",
            "user",
            "full_name",
            "phone_number",
            "email",
            "address",
            "salary",
            "is_active",
            "created_at",
        ]