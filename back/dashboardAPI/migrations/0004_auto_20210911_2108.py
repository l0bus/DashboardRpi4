# Generated by Django 3.2.7 on 2021-09-11 21:08

from django.db import migrations
from dashboardAPI.models.tipo_equipos import TipoEquipos

def add_tipo_equipos_regs(apps, schema_editor):
    tipoEquipo = TipoEquipos()
    tipoEquipo.cod = "CC"
    tipoEquipo.save()

    tipoEquipo = TipoEquipos()
    tipoEquipo.cod = "P"
    tipoEquipo.save()

    tipoEquipo = TipoEquipos()
    tipoEquipo.cod = "LB"
    tipoEquipo.save()

    tipoEquipo = TipoEquipos()
    tipoEquipo.cod = "PER"
    tipoEquipo.save()

    tipoEquipo = TipoEquipos()
    tipoEquipo.cod = "TRAC"
    tipoEquipo.save()

class Migration(migrations.Migration):

    dependencies = [
        ('dashboardAPI', '0003_tipoequipos'),
    ]

    operations = [
        migrations.RunPython(add_tipo_equipos_regs, migrations.RunPython.noop)
    ]
