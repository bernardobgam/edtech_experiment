# Generated by Django 2.1.1 on 2019-08-16 05:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0004_auto_20190816_1511'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cashreceipt',
            name='signature',
            field=models.TextField(),
        ),
    ]
