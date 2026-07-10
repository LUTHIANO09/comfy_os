from django.db import models


class BusinessSetting(models.Model):
    business_name = models.CharField(max_length=150)
    business_address = models.TextField(blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)

    logo = models.ImageField(
        upload_to="business/",
        blank=True,
        null=True
    )

    currency = models.CharField(
        max_length=10,
        default="NGN"
    )

    default_markup_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0
    )

    receipt_footer = models.TextField(blank=True)

    class Meta:
        verbose_name = "Business Setting"
        verbose_name_plural = "Business Settings"

    def __str__(self):
        return self.business_name