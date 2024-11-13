# from django.urls import path
# from .views import ChatHistoryView

# urlpatterns = [
#     path('chat/<str:room_name>/', ChatHistoryView.as_view(), name='chat_history'),
# ]

from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_message, name='create_message'),
    path('sent/', views.sent_messages, name='sent_messages'),
    path('received/', views.received_messages, name='received_messages'),
    path('message/<int:message_id>/', views.message_detail, name='message_detail'),
]