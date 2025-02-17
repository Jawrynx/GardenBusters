from django.db import models

# Create your models here.
class Service(models.Model):
    title = models.CharField(max_length=255, null=True)
    sub_heading = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='service_images/', blank=True, null=True)

    def __str__(self):
        return self.title
    
class Testimonial(models.Model):
    name = models.CharField(max_length=255)
    testimonial = models.TextField()
    image = models.ImageField(upload_to='testimonial_images/', blank=True, null=True)  # Optional image
    created_at = models.DateTimeField(auto_now_add=True)  # Add a timestamp

    def __str__(self):
        return self.name

class Contact(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
