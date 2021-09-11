from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Agrega nuevos registros a la DB, se debe especificar el archivo con los logs'

    def add_arguments(self, parser):
        parser.add_argument('log_file', type=str, help='Ubicación del archivo de Log')

    def handle(self, *args, **kwargs):
        filePath = kwargs['log_file']
        filePath = filePath.replace('log_file=','')
        
        file   = open(filePath, "r", encoding='utf-8')
        lineas = file.readlines()
        for linea in lineas:
            print (linea)
        file.close()  