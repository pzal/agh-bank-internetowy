# Generated by Django 3.0.6 on 2020-11-22 11:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_changed', models.DateTimeField(auto_now=True)),
                ('is_archived', models.BooleanField(default=False)),
                ('name', models.TextField()),
                ('account_number', models.TextField()),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
