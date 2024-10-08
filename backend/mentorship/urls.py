# mentors/urls.py

from django.urls import path
from .views import MentorDetailView, MentorListView
from . import views

urlpatterns = [
    # path('mentors/', MentorListView.as_view(), name='mentor-list'),
    path('mentors/<int:mentor_id>/', MentorDetailView.as_view(), name='mentor-detail'),
    path('mentors/', views.mentor_list, name='mentor-list'),
    path('mentors/filter-options/', views.mentor_filter_options, name='mentor-filter-options'),  # New endpoint
]
