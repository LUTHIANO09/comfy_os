from django.urls import path

from .views import (
    DashboardReportView,
    ExportReportExcelView,
    ExportReportPDFView,
)

urlpatterns = [
    path(
        "dashboard/",
        DashboardReportView.as_view(),
        name="dashboard-report",
    ),

    path(
        "export/excel/",
        ExportReportExcelView.as_view(),
        name="report-export-excel",
    ),

    path(
        "export/pdf/",
        ExportReportPDFView.as_view(),
        name="report-export-pdf",
    ),
]