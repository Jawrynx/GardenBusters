from rest_framework import generics
from .models import Service, BeforeAfter, Testimonial
from .serializers import ServiceSerializer, BeforeAfterSerializer, TestimonialSerializer

# Create your views here.
class ServiceList(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class ServiceDetail(generics.RetrieveAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class BeforeAfterList(generics.ListCreateAPIView):
    queryset = BeforeAfter.objects.all()
    serializer_class = BeforeAfterSerializer

class TestimonialList(generics.ListCreateAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer