# Generated by Django 3.0.6 on 2020-11-22 13:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0002_contact'),
    ]

    operations = [
        migrations.CreateModel(
            name='Transfer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_changed', models.DateTimeField(auto_now=True)),
                ('is_archived', models.BooleanField(default=False)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('pending', models.BooleanField(default=True)),
                ('recipient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.Contact')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
