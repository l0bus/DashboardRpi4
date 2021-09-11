from django.db import models

class CamposLog(models.Model):
    descripcion = models.CharField(max_length=255)
    cod = models.CharField(max_length=255)

class TipoEquipos(models.Model):
    cod = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)
    nombre = models.CharField(max_length=255)