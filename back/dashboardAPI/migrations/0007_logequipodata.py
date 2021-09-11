# Generated by Django 3.2.7 on 2021-09-11 21:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboardAPI', '0006_logequiporeg'),
    ]

    operations = [
        migrations.CreateModel(
            name='LogEquipoData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=1024)),
                ('created_at', models.DateTimeField()),
                ('id_log_reg', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='dashboardAPI.logequiporeg')),
                ('key_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='dashboardAPI.camposlog')),
            ],
        ),
    ]