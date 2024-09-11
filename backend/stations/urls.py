# # urls.py
# from django.urls import path
# from . import views

# urlpatterns = [
#     path('facilities/', views.station_facility_list, name='station_facility_list'),
#     path('', views.station_list, name='station_list'),
# ]

# urls.py
from django.urls import path
from .views import StationFacilityList, StationFacilityDetail

urlpatterns = [
    path('facilities/', StationFacilityList.as_view(), name='facility-list'),
    path('facilities/<int:pk>/', StationFacilityDetail.as_view(), name='facility-detail'),
]

