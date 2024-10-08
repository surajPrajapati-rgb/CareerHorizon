
from rest_framework import generics
from .models import Mentor
from .serializers import MentorSerializer
from .models import Mentor, AvailabilitySlot
from django.http import JsonResponse
from django.db.models import Q
from datetime import time

class MentorDetailView(generics.RetrieveAPIView):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer
    lookup_field = 'mentor_id'  # This will search Mentor by mentor_id instead of pk

class MentorListView(generics.ListAPIView):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer

def mentor_filter_options(request):
    # Get unique values for each filter field from the database
    field_of_study_options = Mentor.objects.values_list('field_of_study', flat=True).distinct()
    degree_options = Mentor.objects.values_list('degree', flat=True).distinct()
    academic_stream_options = Mentor.objects.values_list('academic_stream', flat=True).distinct()
    
    # Availability days come from the availability slots model
    availability_days = AvailabilitySlot.objects.values_list('day_of_week', flat=True).distinct()

    # Prepare data for JSON response
    data = {
        "field_of_study_options": list(field_of_study_options),
        "degree_options": list(degree_options),
        "academic_stream_options": list(academic_stream_options),
        "availability_days": list(availability_days),
    }
    return JsonResponse(data)


def mentor_list(request):
    field_of_study = request.GET.get('field_of_study')
    degree = request.GET.get('degree')
    academic_stream = request.GET.get('academic_stream')
    availability_day = request.GET.get('availability_day')
    availability_time = request.GET.get('availability_time')

    mentors = Mentor.objects.all()

    if field_of_study:
        mentors = mentors.filter(field_of_study__icontains=field_of_study)
    if degree:
        mentors = mentors.filter(degree__icontains=degree)
    if academic_stream:
        mentors = mentors.filter(academic_stream__icontains=academic_stream)

    if availability_day and availability_time:
        availability_time = time.fromisoformat(availability_time)
        mentors = mentors.filter(
            availability_slots__day_of_week=availability_day,
            availability_slots__start_time__lte=availability_time,
            availability_slots__end_time__gte=availability_time
        )

    mentors_data = [
        {
            'mentor_id': mentor.mentor_id,
            'name': mentor.name,
            'field_of_study': mentor.field_of_study,
            'degree': mentor.degree,
            'bio': mentor.bio,
        } for mentor in mentors
    ]

    return JsonResponse(mentors_data, safe=False)