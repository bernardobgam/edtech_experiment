# Generated by Django 2.1.1 on 2019-05-27 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lab', '0003_labprogress_payment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='labprogress',
            name='group',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
