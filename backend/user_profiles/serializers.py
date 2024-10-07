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

        
class AllProfileDetailsSerializer(serializers.ModelSerializer):
    social_links = SocialMediaLinksSerializer(read_only=True)
    professional_details = ProfessionalDetailsSerializer(read_only=True)
    student_details = StudentDetailsSerializer(read_only=True)

    class Meta:
        model = Profile
        fields =    '__all__'

