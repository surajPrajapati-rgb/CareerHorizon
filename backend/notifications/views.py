from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Notification
from .serializers import NotificationSerializer
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

class CreateNotificationView(APIView):
    def post(self, request):
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            notification = serializer.save()

            # Send WebSocket notification
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                'notifications',
                {
                    'type': 'send_notification',
                    'message': {
                        'title': notification.title,
                        'message': notification.message,
                        'created_at': notification.created_at.isoformat()
                    },
                }
            )

            return Response(
                {
                    'id': notification.id,
                    'title': notification.title,
                    'message': notification.message,
                    'created_at': notification.created_at,
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
