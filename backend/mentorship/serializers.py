from rest_framework import serializers
from .models import Mentor, MentorAvailability, MentorSkill, MentorCategory, Review, Message, Session, Payment
from django.contrib.auth.models import User  # Assuming User is used for Mentees and Mentors


# Serializer for Mentor Availability (formerly AvailabilitySlot)
class MentorAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorAvailability
        fields = ['day_of_week', 'start_time', 'end_time']


# Serializer for Mentor Skills (formerly Expertise)
class MentorSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorSkill
        fields = ['skill_name']


# Serializer for Mentor Categories (formerly Experience/Category)
class MentorCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorCategory
        fields = ['category_name']


# Serializer for Mentor Reviews
class ReviewSerializer(serializers.ModelSerializer):
    mentee_name = serializers.CharField(source="mentee.username", read_only=True)
    mentor_name = serializers.CharField(source="mentor.user.username", read_only=True)

    class Meta:
        model = Review
        fields = ['mentee_name', 'mentor_name', 'rating', 'title_review', 'feedback', 'created_at']


# Serializer for Messages
class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source="sender.username", read_only=True)
    receiver_name = serializers.CharField(source="receiver.username", read_only=True)

    class Meta:
        model = Message
        fields = ['sender_name', 'receiver_name', 'content', 'sent_at']


# Serializer for Sessions (formerly MentorSession)
class SessionSerializer(serializers.ModelSerializer):
    mentee_name = serializers.CharField(source="mentee.username", read_only=True)
    mentor_name = serializers.CharField(source="mentor.user.username", read_only=True)

    class Meta:
        model = Session
        fields = ['mentee_name', 'mentor_name', 'session_topic', 'session_duration', 'session_notes', 'session_date']


# Serializer for Payments
class PaymentSerializer(serializers.ModelSerializer):
    mentee_name = serializers.CharField(source="mentee.username", read_only=True)
    session_topic = serializers.CharField(source="session.session_topic", read_only=True)

    class Meta:
        model = Payment
        fields = ['mentee_name', 'session_topic', 'amount', 'payment_date', 'status']


# Serializer for Mentor
class MentorSerializer(serializers.ModelSerializer):
    availability_slots = MentorAvailabilitySerializer(many=True, read_only=True)
    skills = MentorSkillSerializer(many=True, read_only=True)
    categories = MentorCategorySerializer(many=True, read_only=True)
    sessions = SessionSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Mentor
        fields =  ['mentor_id','user','bio','experience_years','hourly_rate','industry','linkedin_url','education','created_at']