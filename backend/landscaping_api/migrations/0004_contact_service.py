# Generated by Django 5.1.6 on 2025-02-19 14:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('landscaping_api', '0003_image_remove_service_image_service_images'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='service',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='contacts', to='landscaping_api.service'),
        ),
    ]
