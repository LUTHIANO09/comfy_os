from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser

from .models import ExpenseCategory, Expense
from .serializers import (
    ExpenseCategorySerializer,
    ExpenseSerializer,
)


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