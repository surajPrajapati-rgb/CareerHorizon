# from django.shortcuts import render

# # Create your views here.

# from .models import Station, StationFacility

# def station_list(request):
#     stations = Station.objects.all()
#     return render(request, 'stations/station_list.html', {'stations':stations})

# def station_facility_list(request):
#     facilities = StationFacility.objects.all()  # Fetch all facilities
#     return render(request, 'stations/facility_list.html', {'facilities': facilities})

# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import StationFacility
from .serializers import StationFacilitySerializer

class StationFacilityList(APIView):
    def get(self, request):
        facilities = StationFacility.objects.all()
        serializer = StationFacilitySerializer(facilities, many=True)  # many=True for queryset
        return Response(serializer.data, status=status.HTTP_200_OK)

class StationFacilityDetail(APIView):
    def get(self, request, pk):
        try:
            facility = StationFacility.objects.get(pk=pk)
            serializer = StationFacilitySerializer(facility)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except StationFacility.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
