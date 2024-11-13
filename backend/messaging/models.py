from django.db import models
from django.contrib.auth.models import User

class Message(models.Model):
    class Meta:
        db_table = "Message"
        ordering = ['timestamp']
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages', null=True, blank=True)
    room_name = models.CharField(max_length=255)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.sender} to {self.recipient or self.room_name}: {self.content[:20]}..."


