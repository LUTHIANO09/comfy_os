from django.urls import path
from .views import (
    InventoryListView,
    StockMovementListView,
    AddStockView,
    RemoveStockView,
)

urlpatterns = [
    path(
        "",
        InventoryListView.as_view(),
        name="inventory-list",
    ),

    path(
        "movements/",
        StockMovementListView.as_view(),
        name="stock-movement-list",
    ),

    path(
        "inventory/<int:pk>/add-stock/",
        AddStockView.as_view(),
        name="add-stock",
    ),

    path(
    "inventory/<int:pk>/remove-stock/",
    RemoveStockView.as_view(),
    name="remove-stock",
    ),
]