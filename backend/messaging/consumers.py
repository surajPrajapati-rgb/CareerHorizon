
import json
from asgiref.sync import sync_to_async
from django.contrib.auth.models import User
from .models import Message  # Import your Message model
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{room_name}'

        # Debug log to see room name
        print(f"Attempting to connect to room: {self.room_group_name}")

        # Join the group (add to the group of connected WebSockets)
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # Accept the WebSocket connection
        await self.accept()

        # Debug log for connection acceptance
        print(f"WebSocket connection accepted for {self.room_group_name}")


    async def disconnect(self, close_code):
        # Debugging log
        print(f"Disconnected from room: {self.room_group_name}, code: {close_code}")
        
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        sender = text_data_json['sender']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender': sender
            }
        )

    async def chat_message(self, event):
        message = event['message']
        sender = event['sender']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender
        }))
