from django.urls import path
from .views import ReturnSaleAPIView

from .views import (
    SaleListCreateView,
    SaleDetailView,
    CheckoutView,
    ReturnSaleAPIView,
    SaleReturnListAPIView,
)

urlpatterns = [
    path(
        "",
        SaleListCreateView.as_view(),
        name="sale-list",
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
]