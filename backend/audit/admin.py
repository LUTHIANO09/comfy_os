from django.contrib import admin
from .models import AuditLog


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "action",
        "model_name",
        "created_at",
    )

    list_filter = (
        "model_name",
        "created_at",
    )

    search_fields = (
        "action",
        "model_name",
        "description",
    )

    ordering = (
        "-created_at",
    )