from django.db import models


class Setting(models.Model):
    business_name = models.CharField(
        max_length=255,
        default="COMFY FOOTWEARS"
    )

    business_address = models.TextField(
        blank=True
    )

    phone_number = models.CharField(
        max_length=20,
        blank=True
    )

    email = models.EmailField(
        blank=True
    )

    logo = models.ImageField(
        upload_to="business_logo/",
        blank=True,
        null=True,
    )

    currency = models.CharField(
        max_length=10,
        default="₦",
    )

    low_stock_threshold = models.PositiveIntegerField(
        default=5
    )

    receipt_footer = models.TextField(
        blank=True,
        default="Thank you for shopping with us."
    )

    tax_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0,
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        verbose_name = "Business Setting"
        verbose_name_plural = "Business Settings"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return self.business_name