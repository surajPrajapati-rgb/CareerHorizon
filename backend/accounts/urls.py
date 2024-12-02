from django.urls import path
from . import views
from .views import CurrentUserView

urlpatterns = [
    path('register/', views.register, name='register'),
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('current_user/<str:user>/', views.current_user_view, name='current_user'),
]
