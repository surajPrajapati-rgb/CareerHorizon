from rest_framework import serializers
from .models import Profile, SocialMediaLinks, ProfessionalDetails, StudentDetails

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class SocialMediaLinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMediaLinks
        fields = '__all__'

class ProfessionalDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfessionalDetails
        fields = '__all__'

class StudentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentDetails
        fields = '__all__'
