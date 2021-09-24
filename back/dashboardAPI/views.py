from django.db.models.query import Prefetch
from django_filters.filters import OrderingFilter
from django_filters.rest_framework.backends import DjangoFilterBackend

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from dashboardAPI.serializers import CamposLogSerializer
from dashboardAPI.serializers import TipoEquiposSerializer
from dashboardAPI.serializers import EquiposSerializer
from dashboardAPI.serializers import LogEquipoRegSerializer
from dashboardAPI.serializers import LogEquipoDataSerializer

from rest_framework import viewsets, permissions
from rest_framework.filters import OrderingFilter

from dashboardAPI.models.campos_log import CamposLog
from dashboardAPI.models.tipo_equipos import TipoEquipos
from dashboardAPI.models.equipos import Equipos
from dashboardAPI.models.log_equipo_reg import LogEquipoReg
from dashboardAPI.models.log_equipo_data import LogEquipoData

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
    queryset = LogEquipoReg.objects.prefetch_related('log_equipo_data').prefetch_related('log_equipo_data__key').all()
    serializer_class = LogEquipoRegSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = {'equipo':['exact'], 'log_equipo_data__key__cod':['exact'], 'log_equipo_data__key__id':['exact'], 'fecha_registro':['lte', 'gte'], 'file_path':['exact'] }
    ordering_fields = ['id','fecha_registro','equipo']

class LogEquipoDataViewSet(viewsets.ModelViewSet):
    queryset = LogEquipoData.objects.prefetch_related('log_equipo_reg').select_related('key').all()
    serializer_class = LogEquipoDataSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = {'key__id':['exact'], 'key__cod':['exact'], 'log_equipo_reg_id':['exact']}
    ordering_fields = ['id','created_at']
