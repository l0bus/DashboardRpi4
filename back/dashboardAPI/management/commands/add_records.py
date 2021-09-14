from django.core.management.base import BaseCommand
import csv

class Command(BaseCommand):
    help = 'Agrega nuevos registros a la DB, se debe especificar el archivo con los logs'

    def add_arguments(self, parser):
        parser.add_argument('log_file', type=str, help='Ubicación del archivo de Log')

    def handle(self, *args, **kwargs):
        filePath = kwargs['log_file']
        filePath = filePath.replace('log_file=','')
        
        file   = open(filePath, "r", encoding='utf-8')
        
        with open(filePath, newline='') as csvfile:
            spamreader = csv.reader(csvfile, delimiter=',', quotechar='', quoting=csv.QUOTE_NONE)
            for row in spamreader:
                print (row)