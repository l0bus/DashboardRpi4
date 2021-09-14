from django.db import transaction
from django.db.models.aggregates import Count

from dashboardAPI.models import CamposLog
from dashboardAPI.models import TipoEquipos
from dashboardAPI.models import Equipos
from dashboardAPI.models import LogEquipoReg
from dashboardAPI.models import LogEquipoData

class DBLogInserter:

    header = []
    fields = {}
    actual_line = 0

    def set_header(self, header):
        self.header = header

        #Se recorren los campos del encabezado, para mapear los ids y para verificar si estan especificados en la DB
        count = 0
        for field in header:
            #Se genera un diccionario de los campos
            self.fields[ field ] = count
            count = count + 1

            #Se consultan por si existen en la DB
            campo_log = CamposLog.objects.filter(cod = field)
            if (len(campo_log) == 0):
                self.insert_campo_log(field)

    def insert_campo_log(self, field):
        campo_log = CamposLog()
        campo_log.cod = field
        campo_log.save()

    def insert_log(self, data, actual_line):
        self.actual_line = actual_line

        #Si la linea actual es la cero, corresponde al encabezado
        if (self.actual_line == 0):
            self.set_header(data)
        #else:
            #print (data)