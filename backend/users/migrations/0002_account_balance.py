# Generated by Django 3.0.6 on 2021-01-23 10:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='balance',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=16),
        ),
    ]
