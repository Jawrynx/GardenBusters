from django.db import models

# Create your models here.

class Image(models.Model):
    image = models.ImageField(upload_to='service_images/', null=True)


class Service(models.Model):
    title = models.CharField(max_length=255, null=True)
    sub_heading = models.CharField(max_length=255)
    description = models.TextField()
    detailed_description = models.TextField(null=True)
    images = models.ManyToManyField(Image, blank=True, null=True)

    def __str__(self):
        return self.title
    
class BeforeAfter(models.Model):
    image = models.ImageField(upload_to='beforeAfter_images/')
    title = models.CharField(max_length=255, blank=True, null=True)
    subtitle = models.CharField(max_length=400, blank=True, null=True)
    
class Testimonial(models.Model):
    name = models.CharField(max_length=255)
    testimonial = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Contact(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='contacts', default=1)  
    name = models.CharField(max_length=255)
    mobile = models.CharField(max_length=33, null=True)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
