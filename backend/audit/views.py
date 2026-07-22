from django.db.models import Count
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import AuditLog
from .serializers import AuditLogSerializer
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination



class AuditLogPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100

from django.db.models import Q
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import AuditLog
from .serializers import AuditLogSerializer


class AuditLogListAPIView(generics.ListAPIView):
    serializer_class = AuditLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = AuditLog.objects.select_related("user")

        module = self.request.query_params.get("module")
        action = self.request.query_params.get("action")
        search = self.request.query_params.get("search")

        if module:
            queryset = queryset.filter(module=module)

        if action:
            queryset = queryset.filter(action=action)

        if search:
            queryset = queryset.filter(
                Q(description__icontains=search)
                | Q(module__icontains=search)
                | Q(user__username__icontains=search)
                | Q(user__first_name__icontains=search)
                | Q(user__last_name__icontains=search)
            )

        return queryset.order_by("-created_at")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        summary = {
            "total_logs": queryset.count(),
            "creates": queryset.filter(
                action=AuditLog.Action.CREATE
            ).count(),
            "updates": queryset.filter(
                action=AuditLog.Action.UPDATE
            ).count(),
            "deletes": queryset.filter(
                action=AuditLog.Action.DELETE
            ).count(),
        }

        page = self.paginate_queryset(queryset)

        serializer = self.get_serializer(page, many=True)

        paginated = self.get_paginated_response(serializer.data)

        paginated.data["summary"] = summary

        return paginated


        

        