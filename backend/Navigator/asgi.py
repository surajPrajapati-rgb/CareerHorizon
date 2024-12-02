# import os
# import django
# from django.core.asgi import get_asgi_application
# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
# from messaging.routing import websocket_urlpatterns

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Navigator.settings')
# django.setup()

# application = ProtocolTypeRouter({
#     "http": get_asgi_application(),
#     "websocket": AuthMiddlewareStack(
#         URLRouter(
#             websocket_urlpatterns
#         )
#     ),
# })





import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path

import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Navigator.settings')
django.setup()

from messaging.consumers import ChatConsumer
from notifications.consumers import NotificationConsumer

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(  # This middleware handles authentication for WebSockets
        URLRouter([
            path('ws/chat/<str:room_name>/', ChatConsumer.as_asgi()),
            path('ws/notifications/', NotificationConsumer.as_asgi()),
        ])
    ),
})

# import os
# from django.core.asgi import get_asgi_application
# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
# from messaging.routing import websocket_urlpatterns
# from messaging import routing

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Navigator.settings')

# application = ProtocolTypeRouter({
#     'http': get_asgi_application(),
#     'websocket': AuthMiddlewareStack(
#         URLRouter(websocket_urlpatterns)
#         # routing.websocket_urlpatterns
#     ),
# })
