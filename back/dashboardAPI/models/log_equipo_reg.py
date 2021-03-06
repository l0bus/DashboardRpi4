from dashboardAPI.models.equipos import Equipos
from django.db import models

class LogEquipoReg(models.Model):
    id              = models.AutoField(primary_key=True)
    file_path       = models.CharField(max_length=512)
    equipo          = models.ForeignKey(Equipos, on_delete=models.DO_NOTHING)
    fecha_registro  = models.DateTimeField()