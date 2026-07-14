from django.urls import path

from .views import (
    SaleListCreateView,
    SaleDetailView,
    CheckoutView,
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
]