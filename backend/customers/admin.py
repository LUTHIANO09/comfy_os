from django.contrib import admin
from .models import Customer


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = (
        "first_name",
        "last_name",
        "phone",
        "email",
        "status",
    )

    search_fields = (
        "first_name",
        "last_name",
        "phone",
        "email",
    )

    list_filter = (
        "status",
    )

    ordering = (
        "first_name",
    )