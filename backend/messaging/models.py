from django.db import models
from django.contrib.auth.models import User


class MessageManager(models.Manager):
    def create_message(self, sender_email, recipient_email, room_name, content):
        try:
            sender = User.objects.get(email=sender_email)
            recipient = User.objects.get(email=recipient_email)
            return self.create(sender=sender, recipient=recipient, room_name=room_name, content=content)
        except User.DoesNotExist:
            raise ValueError("Sender or Recipient does not exist")

  
class Message(models.Model):
    class Meta:
        db_table = "Message"
        ordering = ['timestamp']
        indexes = [
            models.Index(fields=['sender', 'recipient']),
            models.Index(fields=['room_name']),
        ]

    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages', null=True, blank=True)
    room_name = models.CharField(max_length=255)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    objects = MessageManager() 

    def __str__(self):
        return f"Message from {self.sender} to {self.recipient or self.room_name}: {self.content[:20]}..."
