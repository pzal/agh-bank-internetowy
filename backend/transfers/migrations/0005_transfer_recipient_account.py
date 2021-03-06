# Generated by Django 3.0.6 on 2021-01-23 11:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_account_balance'),
        ('transfers', '0004_transfer_failed'),
    ]

    operations = [
        migrations.AddField(
            model_name='transfer',
            name='recipient_account',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='transfers_received', to='users.Account'),
        ),
    ]
