from django.db import transaction
from datetime import datetime
import re

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

    def get_tipo_equipo_from_cod(self, cod):
        str_f_cod = re.sub(r'[0-9]+', '', cod)
        return self.get_tipo_equipo(str_f_cod)

    def insert_campo_log(self, field):
        campo_log = CamposLog()
        campo_log.cod = field
        campo_log.descripcion = 'agregado automaticamente a partir de log'
        return campo_log.save()

    def insert_equipo(self, field):
        equipo = Equipos()
        equipo.cod = field["cod"]
        equipo.tipo_id = field["tipo_id"]
        equipo.created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        equipo.descripcion = 'agregado automaticamente a partir de log'
        equipo.nombre = ''
        return equipo.save()

    def get_tipo_equipo(self, cod):
        return TipoEquipos.objects.filter(cod = cod)

    def get_campo_log(self, field_name):
        return CamposLog.objects.filter(cod = field_name)

    def get_equipo(self, ID):
        return Equipos.objects.filter(cod = ID)

    def get_value_f_row(self, row, key):
        return row[ self.fields[ key ] ]

    def insert_reg_in_DB(self, row):
        cod_equipo = self.get_value_f_row(row, "ID")
        #Se obtiene el id del tipo de equipo a partir de su còdigo
        id_tipo_equipo = self.get_tipo_equipo_from_cod( cod_equipo )[0].id

        #Se verifica que exista el còdigo del equipo, de no existir, se agrega
        equipo = self.get_equipo( cod_equipo )
        if ( len(equipo) == 0 ):
            params = {}
            params["cod"] = cod_equipo
            params["tipo_id"] = id_tipo_equipo
            self.insert_equipo( params )

        count = 0
        for cell in row:
            field_name = self.header[count]
                
            #print(self.get_campo_log(field_name)[0].id)
            count = count + 1

    def insert_log(self, row, actual_line):
        self.actual_line = actual_line

        #Si la linea actual es la cero, corresponde al encabezado
        if (self.actual_line == 0):
            self.set_header(row)
        else:
            self.insert_reg_in_DB(row)
            