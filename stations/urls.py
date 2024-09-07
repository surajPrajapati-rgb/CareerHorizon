# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('facilities/', views.station_facility_list, name='station_facility_list'),
    path('', views.station_list, name='station_list'),
]
