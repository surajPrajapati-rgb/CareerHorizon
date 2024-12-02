from django.apps import AppConfig

class YourAppNameConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ProfileSection'

    def ready(self):
        import importlib
        try:
            importlib.import_module('ProfileSection.signals')
        except ImportError as e:
            print(f"Error importing signals: {e}")