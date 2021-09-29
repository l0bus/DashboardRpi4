from dashboardAPI.models.tipo_equipos import TipoEquipos
from django.db import models

class Equipos(models.Model):
    id = models.AutoField(primary_key=True)
    cod = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)
    tipo = models.ForeignKey(TipoEquipos, related_name="equipos", on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField()