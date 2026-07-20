from django.urls import path

from .views import (
    PayrollRecordListAPIView,
    RunPayrollAPIView,
    PayPayrollAPIView,
)

urlpatterns = [
    path(
        "",
        PayrollRecordListAPIView.as_view(),
        name="payroll-list",
    ),

    path(
        "run/",
        RunPayrollAPIView.as_view(),
        name="run-payroll",
    ),

    path(
        "<int:pk>/pay/",
        PayPayrollAPIView.as_view(),
        name="pay-payroll",
    ),
]