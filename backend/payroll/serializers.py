from rest_framework import serializers

from .models import PayrollRecord


class PayrollRecordSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(
        source="employee.full_name",
        read_only=True,
    )

    period = serializers.SerializerMethodField()

    class Meta:
        model = PayrollRecord

        fields = [
            "id",
            "employee_name",
            "salary",
            "status",
            "paid_at",
            "period",
        ]

    def get_period(self, obj):
        return f"{obj.period.month}/{obj.period.year}"