from django.contrib import admin
from .models import BusinessSetting


@admin.register(BusinessSetting)
class BusinessSettingAdmin(admin.ModelAdmin):
    list_display = (
        "business_name",
        "phone_number",
        "currency",
    )