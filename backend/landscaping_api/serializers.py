from rest_framework import serializers
from .models import Service, Testimonial, Contact, Image

class ImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    
    class Meta:
        model = Image
        fields = ['image']


class ServiceSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True) 

    class Meta:
        model = Service
        fields = '__all__'
        

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'