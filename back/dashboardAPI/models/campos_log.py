from django.db import models

class CamposLog(models.Model):
    id = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=255)
    cod = models.CharField(max_length=255)