from rest_framework import serializers
from dashboardAPI.models.campos_log import CamposLog
from dashboardAPI.models.tipo_equipos import TipoEquipos
from dashboardAPI.models.equipos import Equipos
from dashboardAPI.models.log_equipo_reg import LogEquipoReg
from dashboardAPI.models.log_equipo_data import LogEquipoData

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

class LogEquipoDataSerializer(serializers.ModelSerializer):
    key = CamposLogSerializer()
    class Meta:
        model = LogEquipoData
        fields = ['id','key','value','created_at', 'log_equipo_reg_id']

class LogEquipoRegSerializer(serializers.ModelSerializer):
    log_equipo_data = LogEquipoDataSerializer(read_only = True, many = True)
    class Meta:
        model = LogEquipoReg
        fields = ['id', 'file_path', 'equipo', 'fecha_registro', 'log_equipo_data']