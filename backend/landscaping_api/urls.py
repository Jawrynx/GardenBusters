from django.urls import path
from . import views

urlpatterns = [
    path('services/', views.ServiceList.as_view(), name='service-list'),
    path('services/<int:pk>/', views.ServiceDetail.as_view(), name='service-detail'),
    path('beforeafter/', views.BeforeAfterList.as_view(), name='beforeafter-list'),
    path('testimonial/', views.TestimonialList.as_view(), name='testimonial-list'),
]
