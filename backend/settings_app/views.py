from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Setting
from .serializers import SettingSerializer


class SettingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        setting = Setting.load()

        serializer = SettingSerializer(setting)

        return Response(serializer.data)

    def put(self, request):
        setting = Setting.load()

        serializer = SettingSerializer(
            setting,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data)