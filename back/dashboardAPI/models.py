from django.db import models

class CamposLog(models.Model):
    descripcion = models.CharField(max_length=255)
    cod = models.CharField(max_length=255)
