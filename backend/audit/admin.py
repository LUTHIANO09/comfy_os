from django.contrib import admin
from .models import AuditLog


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "module",
        "action",
        "description",
        "created_at",
    )

    list_filter = (
        "module",
        "action",
        "created_at",
    )

    search_fields = (
        "module",
        "description",
        "user__username",
        "user__full_name",
    )

    ordering = ("-created_at",)
    