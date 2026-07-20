from datetime import date

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import PayrollPeriod, PayrollRecord
from .serializers import PayrollRecordSerializer

from employees.models import Employee

from django.utils import timezone

from expenses.models import Expense, ExpenseCategory
from django.shortcuts import get_object_or_404
from django.db import transaction
from rest_framework import generics

from notifications.utils import create_notification
from notifications.models import Notification


class RunPayrollAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        today = date.today()

        period, created = PayrollPeriod.objects.get_or_create(
            month=today.month,
            year=today.year,
        )

        employees = Employee.objects.filter(
            is_active=True
        )

        created_records = 0

        for employee in employees:

            _, was_created = PayrollRecord.objects.get_or_create(
                employee=employee,
                period=period,
                defaults={
                    "salary": employee.salary,
                },
            )

            if was_created:
                created_records += 1

        return Response({
            "message": "Payroll generated successfully.",
            "created_records": created_records,
        })

class PayPayrollAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, pk):

        payroll = get_object_or_404(
            PayrollRecord,
            pk=pk,
        )

        if payroll.status == PayrollRecord.Status.PAID:
            return Response(
                {"detail": "Salary already paid."},
                status=400,
            )

        salary_category, _ = ExpenseCategory.objects.get_or_create(
            name="Salary"
        )

        with transaction.atomic():

            Expense.objects.create(
                category=salary_category,
                amount=payroll.salary,
                description=(
                    f"Salary payment for "
                    f"{payroll.employee.full_name} "
                    f"({payroll.period.month}/{payroll.period.year})"
                ),
                expense_date=timezone.localdate(),
                payment_method=Expense.PaymentMethod.TRANSFER,
                created_by=request.user,
            )

            create_notification(
                user=request.user,
                title="Payroll Paid",
                message=(
                    f"Salary paid to "
                    f"{payroll.employee.full_name}."
                ),
                notification_type=Notification.NotificationType.PAYROLL,
            )

            payroll.status = PayrollRecord.Status.PAID
            payroll.paid_at = timezone.now()
            payroll.save()

        return Response({
            "message": "Salary paid successfully."
        })



class PayrollRecordListAPIView(generics.ListAPIView):
    queryset = (
        PayrollRecord.objects
        .select_related(
            "employee",
            "period",
        )
        .order_by(
            "-period__year",
            "-period__month",
            "employee__full_name",
        )
    )

    serializer_class = PayrollRecordSerializer
    permission_classes = [AllowAny]