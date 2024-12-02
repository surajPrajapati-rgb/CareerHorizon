from django.urls import path
from .views import CreateNotificationView

urlpatterns = [
    path('notifications/', CreateNotificationView.as_view(), name='create-notification'),
]
