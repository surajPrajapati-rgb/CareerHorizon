from django.shortcuts import render

# Create your views here.

from .models import Station, StationFacility

def station_list(request):
    stations = Station.objects.all()
    return render(request, 'stations/station_list.html', {'stations':stations})

def station_facility_list(request):
    facilities = StationFacility.objects.all()  # Fetch all facilities
    return render(request, 'stations/facility_list.html', {'facilities': facilities})