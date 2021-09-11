from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from dashboardAPI.serializers import CamposLogSerializer
from dashboardAPI.serializers import TipoEquiposSerializer
from dashboardAPI.serializers import EquiposSerializer
from dashboardAPI.serializers import LogEquipoRegSerializer

from rest_framework import viewsets, permissions

from dashboardAPI.models import CamposLog
from dashboardAPI.models import TipoEquipos
from dashboardAPI.models import Equipos
from dashboardAPI.models import LogEquipoReg

class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)

class CamposLogViewSet(viewsets.ModelViewSet):
    queryset = CamposLog.objects.all()
    serializer_class = CamposLogSerializer
    permission_classes = [permissions.IsAuthenticated]

class TipoEquiposViewSet(viewsets.ModelViewSet):
    queryset = TipoEquipos.objects.all()
    serializer_class = TipoEquiposSerializer
    permission_classes = [permissions.IsAuthenticated]

class EquiposViewSet(viewsets.ModelViewSet):
    queryset = Equipos.objects.all()
    serializer_class = EquiposSerializer
    permission_classes = [permissions.IsAuthenticated]

class LogEquipoRegViewSet(viewsets.ModelViewSet):
    queryset = LogEquipoReg.objects.all()
    serializer_class = LogEquipoRegSerializer
    permission_classes = [permissions.IsAuthenticated]