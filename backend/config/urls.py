from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("api/", include("products.urls")),
    path("api/inventory/", include("inventory.urls")),
    path("api/dashboard/", include("dashboard.urls")),
    path("api/sales/", include("sales.urls")),
    path("api/suppliers/", include("suppliers.urls"),),
    path("api/customers/", include("customers.urls")),
    path("api/employees/", include("employees.urls")),
    path("api/accounts/", include("accounts.urls")),
    path("api/expenses/", include("expenses.urls")),
    path("api/reports/", include("reports.urls")),
    path("api/settings/", include("settings_app.urls")),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )