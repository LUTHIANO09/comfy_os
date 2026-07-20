from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser

from .models import ExpenseCategory, Expense
from .serializers import (
    ExpenseCategorySerializer,
    ExpenseSerializer,
)
from notifications.utils import create_notification
from notifications.models import Notification


class ExpenseCategoryListCreateView(
    generics.ListCreateAPIView
):
    queryset = ExpenseCategory.objects.all().order_by("name")
    serializer_class = ExpenseCategorySerializer
    permission_classes = [AllowAny]


class ExpenseCategoryRetrieveUpdateDestroyView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = ExpenseCategory.objects.all()
    serializer_class = ExpenseCategorySerializer
    permission_classes = [AllowAny]


class ExpenseListCreateView(
    generics.ListCreateAPIView
):
    queryset = Expense.objects.select_related(
        "category",
        "created_by",
    ).all()

    serializer_class = ExpenseSerializer
    permission_classes = [AllowAny]

    parser_classes = (
        MultiPartParser,
        FormParser,
    )

    def perform_create(self, serializer):
        expense = serializer.save()

        create_notification(
            user=self.request.user,
            title="New Expense",
            message=f"{expense.category.name} expense of ₦{expense.amount} recorded.",
            notification_type=Notification.NotificationType.EXPENSE,
        )


class ExpenseRetrieveUpdateDestroyView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = Expense.objects.select_related(
        "category",
        "created_by",
    ).all()

    serializer_class = ExpenseSerializer
    permission_classes = [AllowAny]

    parser_classes = (
        MultiPartParser,
        FormParser,
    )