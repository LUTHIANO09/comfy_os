from django.contrib import admin
from .models import PayrollPeriod, PayrollRecord


@admin.register(PayrollPeriod)
class PayrollPeriodAdmin(admin.ModelAdmin):
    list_display = (
        "month",
        "year",
        "created_at",
    )

    ordering = (
        "-year",
        "-month",
    )


@admin.register(PayrollRecord)
class PayrollRecordAdmin(admin.ModelAdmin):
    list_display = (
        "employee",
        "period",
        "salary",
        "status",
        "paid_at",
    )

    list_filter = (
        "status",
        "period",
    )

    search_fields = (
        "employee__full_name",
    )