from django.db import models

# Create your models here.

class Image(models.Model):
    image = models.ImageField(upload_to='service_images/')


class Service(models.Model):
    title = models.CharField(max_length=255, null=True)
    sub_heading = models.CharField(max_length=255)
    description = models.TextField()
    images = models.ManyToManyField(Image)

    def __str__(self):
        return self.title
    
class Testimonial(models.Model):
    name = models.CharField(max_length=255)
    testimonial = models.TextField()
    image = models.ImageField(upload_to='testimonial_images/', blank=True, null=True)
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
    
