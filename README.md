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
