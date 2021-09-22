from dashboardAPI.models.log_equipo_reg import LogEquipoReg
from dashboardAPI.models.campos_log import CamposLog
from django.db import models

class LogEquipoData(models.Model):
    id = models.AutoField(primary_key=True)
    key_id = models.ForeignKey(CamposLog, on_delete=models.DO_NOTHING)
    value = models.CharField(max_length=1024)
    id_log_reg = models.ForeignKey(LogEquipoReg, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField()

    @property
    def key_code(self):
        return self.key_id.cod