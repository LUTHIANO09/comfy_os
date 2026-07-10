from django.contrib import admin
from .models import ExpenseCategory, Expense


@admin.register(ExpenseCategory)
class ExpenseCategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = (
        "category",
        "amount",
        "created_by",
        "created_at",
    )

    list_filter = (
        "category",
    )

    search_fields = (
        "category__name",
        "description",
    )

    ordering = (
        "-created_at",
    )