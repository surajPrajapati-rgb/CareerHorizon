from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Notification
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

@receiver(post_save, sender=Notification)
def send_notification_on_create(sender, instance, created, **kwargs):
    if created:  # Trigger only on new notification creation
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            'notifications',
            {
                'type': 'send_notification',
                'message': {
                    'title': instance.title,
                    'message': instance.message,
                    'created_at': instance.created_at.isoformat()
                },
            }
        )
