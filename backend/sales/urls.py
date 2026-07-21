from django.urls import path
from .views import ReturnSaleAPIView
from .views import ExportSalesCSVAPIView

from .views import (
    SaleListCreateView,
    SaleDetailView,
    CheckoutView,
    ReturnSaleAPIView,
    SaleReturnListAPIView,
    SaleReceiptAPIView,
    ExportSalesCSVAPIView,
    ExportSalesExcelAPIView,
)

urlpatterns = [

    path(
        "",
        SaleListCreateView.as_view(),
        name="sale-list",
    ),

    path(
        "<int:sale_id>/receipt/",
        SaleReceiptAPIView,
        name="sale-receipt",
    ),

    path(
        "<int:pk>/",
        SaleDetailView.as_view(),
        name="sale-detail",
    ),

    path(
        "checkout/",
        CheckoutView.as_view(),
        name="checkout",
    ),

    path(
        "<int:sale_id>/return/",
        ReturnSaleAPIView.as_view(),
        name="sale-return",
    ),

    path(
        "returns/",
        SaleReturnListAPIView.as_view(),
        name="sale-return-list",
    ),

    path(
        "export/csv/",
        ExportSalesCSVAPIView,
        name="sales-export-csv",
    ),

    path(
        "export/excel/",
        ExportSalesExcelAPIView,
        name="sales-export-excel",
    ),
]