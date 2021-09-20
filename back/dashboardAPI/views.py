from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from dashboardAPI.models import (CamposLog, Equipos, LogEquipoData,
                                 LogEquipoReg, TipoEquipos)
from dashboardAPI.serializers import (CamposLogSerializer, EquiposSerializer,
                                      LogEquipoDataSerializer,
                                      LogEquipoRegSerializer,
                                      TipoEquiposSerializer)


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

    filter_backends = [DjangoFilterBackend]
    filterset_fields = {'id_equipo':['exact'], 'fecha_registro':['lte', 'gte'], 'file_path':['exact'] }

class LogEquipoDataViewSet(viewsets.ModelViewSet):
    queryset = LogEquipoData.objects.all()
    serializer_class = LogEquipoDataSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [DjangoFilterBackend]
    filterset_fields = {'id_log_reg':['exact'], 'id_log_reg__id_equipo':['exact'], 'id_log_reg__fecha_registro':['lte', 'gte']}