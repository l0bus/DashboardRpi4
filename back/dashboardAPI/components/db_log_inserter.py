from datetime import datetime
import re

from dashboardAPI.models.campos_log import CamposLog
from dashboardAPI.models.tipo_equipos import TipoEquipos
from dashboardAPI.models.equipos import Equipos
from dashboardAPI.models.log_equipo_reg import LogEquipoReg
from dashboardAPI.models.log_equipo_data import LogEquipoData

class DBLogInserter:

    header = []
    fields = {}
    actual_line = 0
    filePath = ''

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
        equipo.save()
        return equipo

    def get_tipo_equipo(self, cod):
        return TipoEquipos.objects.filter(cod = cod)

    def get_campo_log(self, field_name):
        return CamposLog.objects.filter(cod = field_name)

    def get_equipo(self, ID):
        return Equipos.objects.filter(cod = ID)

    def get_value_f_row(self, row, key):
        return row[ self.fields[ key ] ]

    def insert_log_equipo_data(self, key_id, value, inser_log_reg):
        log_reg_data = LogEquipoData()
        log_reg_data.created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_reg_data.key = CamposLog.objects.get(id = key_id)
        log_reg_data.value = value
        log_reg_data.save()
        log_reg_data.log_equipo_reg.set([inser_log_reg])
        return log_reg_data

    def insert_log_equipo_reg(self, idEquipo):
        log_equipo_reg = LogEquipoReg()
        log_equipo_reg.equipo = Equipos.objects.get(id = idEquipo)
        log_equipo_reg.fecha_registro = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_equipo_reg.file_path = self.filePath
        log_equipo_reg.save()
        return log_equipo_reg

    def insert_reg_in_DB(self, row):
        cod_equipo = self.get_value_f_row(row, "ID")
        #Se obtiene el id del tipo de equipo a partir de su còdigo
        id_tipo_equipo = self.get_tipo_equipo_from_cod( cod_equipo )
        if (len(id_tipo_equipo) == 0):
            id_tipo_equipo = 0
        else:
            id_tipo_equipo = id_tipo_equipo[0].id

        #Se verifica que exista el còdigo del equipo, de no existir, se agrega
        equipo = self.get_equipo( cod_equipo )
        if ( len(equipo) == 0 ):
            params = {}
            params["cod"] = cod_equipo
            params["tipo_id"] = id_tipo_equipo
            equipo_id = self.insert_equipo( params ).pk
        else:
            equipo_id = equipo[0].id

        #Se agrega un nuevo registro correspondiente a una entrada de log (Se agregarìa un registro en esta tabla por cada registro en el archivo de logs)
        inser_log_reg = self.insert_log_equipo_reg( equipo_id )

        count = 0
        for cell in row:
            field_name = self.header[count]
            self.insert_log_equipo_data( self.get_campo_log(field_name)[0].id, cell, inser_log_reg  )
            count = count + 1

    def insert_log(self, row, actual_line, filePath):
        self.actual_line = actual_line
        self.filePath = filePath
        
        #Si la linea actual es la cero, corresponde al encabezado
        if (self.actual_line == 0):
            self.set_header(row)
        else:
            self.insert_reg_in_DB(row)
                  