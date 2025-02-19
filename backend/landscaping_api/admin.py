from django.contrib import admin
from django.db import models
from.models import Service, Image
from.widgets import ListWidget 

class ServiceAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': ListWidget},
    }

admin.site.register(Service, ServiceAdmin)
admin.site.register(Image)