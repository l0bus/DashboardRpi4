from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from dashboardAPI.serializers import CamposLogSerializer
from rest_framework import viewsets, permissions
from dashboardAPI.models import CamposLog

class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)

class CamposLogViewSet(viewsets.ModelViewSet):
    queryset = CamposLog.objects.all()
    serializer_class = CamposLogSerializer
    permission_classes = [permissions.IsAuthenticated]

