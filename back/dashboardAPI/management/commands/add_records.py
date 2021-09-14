from django.core.management.base import BaseCommand
import csv
from dashboardAPI.components.db_log_inserter import DBLogInserter

class Command(BaseCommand):
    help = 'Agrega nuevos registros a la DB, se debe especificar el archivo con los logs'

    #Se instancia clase encargada de realizar las operaciones en la base de datos
    db_log_inserted = DBLogInserter()

    def add_arguments(self, parser):
        parser.add_argument('log_file', type=str, help='Ubicación del archivo de Log')

    def handle(self, *args, **kwargs):
        #Obtencion de parametros
        filePath = kwargs['log_file']
        filePath = filePath.replace('log_file=','')
        
        #Se abre el archivo como .CSV (ya que su sintaxis es compatible con dicho formato)
        with open(filePath, newline='') as csvfile:
            spamreader = csv.reader(csvfile, delimiter=',', quotechar='', quoting=csv.QUOTE_NONE)
            line_count = 0
            for row in spamreader:
                self.db_log_inserted.insert_log(row, line_count)
                line_count = line_count + 1