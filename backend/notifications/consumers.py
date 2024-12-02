import json
from channels.generic.websocket import AsyncWebsocketConsumer

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print(f"WebSocket connection initiated. Channel name: {self.channel_name}")
        
        self.group_name = 'notifications'

        try:
            await self.channel_layer.group_add(
                self.group_name,
                self.channel_name
            )
            print(f"Successfully added {self.channel_name} to group {self.group_name}")
            
            await self.accept()
            print("WebSocket connection accepted")
        except Exception as e:
            print(f"Error during connection: {e}")
            raise

    async def disconnect(self, close_code):
        print(f"WebSocket disconnecting. Close code: {close_code}")
        
        try:
            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name
            )
            print(f"Successfully removed {self.channel_name} from group {self.group_name}")
        except Exception as e:
            print(f"Error during disconnection: {e}")

    async def send_notification(self, event):
        # Send the message to WebSocket as JSON
        try:
            message = event['message']
            print(f"Sending notification: {message}")
            
            await self.send(text_data=json.dumps(message))
            print("Notification sent successfully")
        except Exception as e:
            print(f"Error sending notification: {e}")