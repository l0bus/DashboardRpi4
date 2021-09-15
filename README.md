# DashboardRpi4


## Pre requisitos
1. Tener Python3 instalado
2. Tener MariaDB o MySQL instalado
3. Tener usuario y base de datos creados
4. Tener un servidor web para el front (Puede ser Apache o Nginx)

## Backend, puesta en marcha (luego se podrìa agregar todo en un .sh para hacerlo más práctico)
1. Instalar python3
2. Instalar dependencias Django: pip3 install django
3. Instalar DjangoRestFramework: pip3 install djangorestframework
4. Configurar parametros de base de datos (en archivo back/dashBoardAPI/settings.py
5. Ejecutar migraciones de la DB (en directorio back): python3 manage.py migrate
6. Crear el usuario administrador con (en directorio back, el email puede ser ficticio): python3 manage.py createsuperuser --username username --email email 
7. El backend se puede dejar corriendo con python3 manage.py runserver (en algun script que se ejecute al inicio) tambien puede usar gunicorn

## Carga de archivos de logs
Para la carga de logs, se prevee un comando (en el proyecto Django) que deberá ser ejecutado cada vez que se reciba un archivo de logs, dicho comando es: python3 manage.py add_records log_file=path/archivo/logs.log, sugiero agregarlo al final del update.sh
