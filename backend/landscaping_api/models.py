from django.db import models

# Create your models here.
class Service(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.ImageField(upload_to='service_images/', blank=True, null=True)

    def __str__(self):
        return self.name
    
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
    
