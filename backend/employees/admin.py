from django.contrib import admin
from .models import Employee


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "user",
        "phone_number",
        "salary",
        "is_active",
    )

    list_filter = (
        "is_active",
    )

    search_fields = (
        "full_name",
        "user__username",
    )

    ordering = (
        "full_name",
    )