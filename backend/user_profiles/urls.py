from django.urls import path
from . import views

urlpatterns = [
    path('profiles/', views.profile_list, name='profile-list'),
    path('profiles/<int:user_id>/', views.profile_detail, name='profile-detail'),
    path('profiles/get_profile_by_email/', views.get_profile_by_email, name='get_profile_by_email'),
]
