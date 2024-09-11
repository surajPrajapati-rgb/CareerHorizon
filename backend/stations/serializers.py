
from rest_framework import serializers
from .models import StationFacility

class StationFacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = StationFacility
        fields = '__all__'  
