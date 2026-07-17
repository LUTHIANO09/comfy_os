from django.urls import path

from .views import (
    ExpenseCategoryListCreateView,
    ExpenseCategoryRetrieveUpdateDestroyView,
    ExpenseListCreateView,
    ExpenseRetrieveUpdateDestroyView,
)

urlpatterns = [
    # Expense Categories
    path(
        "categories/",
        ExpenseCategoryListCreateView.as_view(),
        name="expense-category-list",
    ),
    path(
        "categories/<int:pk>/",
        ExpenseCategoryRetrieveUpdateDestroyView.as_view(),
        name="expense-category-detail",
    ),

    # Expenses
    path(
        "",
        ExpenseListCreateView.as_view(),
        name="expense-list",
    ),
    path(
        "<int:pk>/",
        ExpenseRetrieveUpdateDestroyView.as_view(),
        name="expense-detail",
    ),
]