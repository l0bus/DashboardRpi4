from django.db import models

class CamposLog(models.Model):
    descripcion = models.CharField(max_length=255)
    cod = models.CharField(max_length=255)

class TipoEquipos(models.Model):
    cod = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)
    nombre = models.CharField(max_length=255)

class Equipos(models.Model):
    cod = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)
    tipo = models.ForeignKey(TipoEquipos, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField()

class LogEquipoReg(models.Model):
    id_equipo = models.ForeignKey(Equipos, on_delete=models.DO_NOTHING)
    fecha_registro = models.DateTimeField()

class LogEquipoData(models.Model):
    key_id = models.ForeignKey(CamposLog, on_delete=models.DO_NOTHING)
    value = models.CharField(max_length=1024)
    id_log_reg = models.ForeignKey(LogEquipoReg, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField()
