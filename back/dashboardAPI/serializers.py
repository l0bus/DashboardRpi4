from rest_framework import serializers
from dashboardAPI.models import CamposLog
from dashboardAPI.models import TipoEquipos
from dashboardAPI.models import Equipos
from dashboardAPI.models import LogEquipoReg
from dashboardAPI.models import LogEquipoData

class CamposLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = CamposLog
        fields = [
            'id',
            'descripcion',
            'cod',
        ]

class TipoEquiposSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoEquipos
        fields = [
            'id',
            'nombre',
            'cod',
        ]

class EquiposSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipos
        fields = [
            'id',
            'descripcion',
            'cod',
            'tipo',
            'created_at'
        ]

class LogEquipoRegSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogEquipoReg
        fields = [
            'id',
            'id_equipo',
            'fecha_registro',
        ]

class LogEquipoDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogEquipoData
        fields = [
            'id',
            'key_id',
            'value',
            'id_log_reg',
            'created_at'
        ]