from django.urls import path
from . import views

urlpatterns = [
    path('services/', views.ServiceList.as_view(), name='service-list'),
    path('services/<int:pk>/', views.ServiceDetail.as_view(), name='service-detail'),
]
