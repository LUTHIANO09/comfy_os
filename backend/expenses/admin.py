from django.contrib import admin
from .models import ExpenseCategory, Expense


@admin.register(ExpenseCategory)
class ExpenseCategoryAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "is_active",
        "created_at",
    )

    list_filter = (
        "is_active",
    )

    search_fields = (
        "name",
    )


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = (
        "category",
        "amount",
        "payment_method",
        "expense_date",
        "created_by",
    )

    list_filter = (
        "category",
        "payment_method",
        "expense_date",
    )

    search_fields = (
        "description",
    )

    autocomplete_fields = (
        "category",
        "created_by",
    )

    date_hierarchy = "expense_date"