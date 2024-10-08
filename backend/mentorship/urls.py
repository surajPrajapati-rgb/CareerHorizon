# mentors/urls.py

from django.urls import path
from .views import MentorDetailView, MentorListView
import mentorship.views as views

urlpatterns = [
    path('mentors/', views.mentor_list, name='mentor-list'),
    path('mentors/filter-options/', views.mentor_filter_options, name='mentor-filter-options'),  # New endpoint
]