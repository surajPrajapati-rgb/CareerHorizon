# mentors/urls.py

from django.urls import path
from .views import MentorDetailView, MentorListView

urlpatterns = [
    path('mentors/', MentorListView.as_view(), name='mentor-list'),
    path('mentors/<int:mentor_id>/', MentorDetailView.as_view(), name='mentor-detail'),
]
