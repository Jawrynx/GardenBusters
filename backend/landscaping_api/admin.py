from django.contrib import admin
from django.db import models
from.models import Service, Image, BeforeAfter, Testimonial
from.widgets import ListWidget 

class ServiceAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': ListWidget},
    }

class BeforeAfterAdmin(admin.ModelAdmin):
    pass

admin.site.register(Service, ServiceAdmin)
admin.site.register(Image)
admin.site.register(BeforeAfter, BeforeAfterAdmin)
admin.site.register(Testimonial)