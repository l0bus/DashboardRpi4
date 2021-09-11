from rest_framework import serializers
from dashboardAPI.models import CamposLog
from dashboardAPI.models import TipoEquipos
from dashboardAPI.models import Equipos

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