
from rest_framework import generics
from .models import Mentor
from .serializers import MentorSerializer

class MentorDetailView(generics.RetrieveAPIView):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer
    lookup_field = 'mentor_id'  # This will search Mentor by mentor_id instead of pk

class MentorListView(generics.ListAPIView):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer
