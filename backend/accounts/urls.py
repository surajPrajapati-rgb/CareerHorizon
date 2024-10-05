from django.urls import path
from . import views

urlpatterns = [
    path('api/register/', views.register, name='register'),
    path('api/signup/', views.signup_view, name='signup'),
    path('api/login/', views.login, name='login'),
    path('api/logout/', views.logout, name='logout'),
]
