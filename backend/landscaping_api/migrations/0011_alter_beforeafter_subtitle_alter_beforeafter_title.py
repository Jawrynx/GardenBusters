# Generated by Django 5.1.6 on 2025-02-22 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('landscaping_api', '0010_beforeafter'),
    ]

    operations = [
        migrations.AlterField(
            model_name='beforeafter',
            name='subtitle',
            field=models.CharField(blank=True, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='beforeafter',
            name='title',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
