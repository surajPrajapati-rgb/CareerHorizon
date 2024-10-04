# profiles_app/serializers.py
from rest_framework import serializers
from .models import Profile, SocialMediaLinks, ProfessionalDetails, StudentDetails

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

class ProfileSerializer(serializers.ModelSerializer):
    social_links = SocialMediaLinksSerializer()
    professional_details = ProfessionalDetailsSerializer()
    student_details = StudentDetailsSerializer()

    class Meta:
        model = Profile
        fields = '__all__'

    def create(self, validated_data):
        social_links_data = validated_data.pop('social_links', None)
        professional_details_data = validated_data.pop('professional_details', None)
        student_details_data = validated_data.pop('student_details', None)

        profile = Profile.objects.create(**validated_data)

        if social_links_data:
            social_links = SocialMediaLinks.objects.create(profile=profile, **social_links_data)

        if professional_details_data:
            professional_details = ProfessionalDetails.objects.create(profile=profile, **professional_details_data)

        if student_details_data:
            student_details = StudentDetails.objects.create(profile=profile, **student_details_data)

        return profile
