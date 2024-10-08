# mentors/serializers.py

from rest_framework import serializers
from .models import Mentor, AvailabilitySlot, Expertise, Experience, Education, MentorSession

class AvailabilitySlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailabilitySlot
        fields = ['day_of_week', 'start_time', 'end_time']

class ExpertiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expertise
        fields = ['topic', 'description']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['organization', 'role', 'field', 'start_date', 'end_date', 'description']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['institution_name', 'degree', 'field_of_study', 'start_year', 'end_year']

class MentorSessionSerializer(serializers.ModelSerializer):
    mentee_name = serializers.CharField(source="mentee.name", read_only=True)

    class Meta:
        model = MentorSession
        fields = ['mentee_name', 'session_date', 'duration', 'status', 'notes']

class MentorSerializer(serializers.ModelSerializer):
    availability_slots = AvailabilitySlotSerializer(many=True, read_only=True)
    expertise_areas = ExpertiseSerializer(many=True, read_only=True)
    experiences = ExperienceSerializer(many=True, read_only=True)
    education = EducationSerializer(many=True, read_only=True)
    sessions = MentorSessionSerializer(many=True, read_only=True)

    class Meta:
        model = Mentor
        fields = '__all__'
