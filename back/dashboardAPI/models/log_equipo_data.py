from dashboardAPI.models.log_equipo_reg import LogEquipoReg
from dashboardAPI.models.campos_log import CamposLog
from django.db import models

class LogEquipoData(models.Model):
    id         = models.AutoField(primary_key=True)
    key        = models.ForeignKey(CamposLog, related_name="log_equipo_data_key", on_delete=models.DO_NOTHING)
    value      = models.CharField(max_length=1024)
    created_at = models.DateTimeField()
    log_equipo_reg = models.ForeignKey(LogEquipoReg, related_name="log_equipo_data", on_delete=models.DO_NOTHING)