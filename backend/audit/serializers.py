from rest_framework import serializers
from .models import AuditLog


class AuditLogSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = AuditLog
        fields = [
            "id",
            "user_name",
            "module",
            "action",
            "description",
            "object_id",
            "created_at",
        ]

    def get_user_name(self, obj):
        if obj.user:
            full_name = obj.user.get_full_name()

            if full_name:
                return full_name

            return obj.user.username

        return "System"