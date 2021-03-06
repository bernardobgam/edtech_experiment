# Generated by Django 2.1.1 on 2019-08-16 03:19

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('lab', '0009_labprogress_computer'),
    ]

    operations = [
        migrations.CreateModel(
            name='ParticipationConsent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=320)),
                ('consent', models.BooleanField(default=False)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('lab_code', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lab.LabCode')),
                ('lab_session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lab.LabProgress')),
            ],
        ),
    ]
