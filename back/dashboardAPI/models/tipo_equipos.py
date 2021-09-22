from django.db import models

class TipoEquipos(models.Model):
    id = models.AutoField(primary_key=True)
    cod = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)
    nombre = models.CharField(max_length=255)