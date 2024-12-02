from django.apps import AppConfig


class NotificationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'notifications'

    # def ready(self):
    #     from . import signals
        # import notifications.signals
        # import importlib
        # try:
        #     importlib.import_module('notifications.signals')
        # except ImportError as e:
        #     print(f"Error importing signals: {e}")