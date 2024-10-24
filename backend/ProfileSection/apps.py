from django.apps import AppConfig

class ProfileSectionConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ProfileSection'  # Make sure this matches the folder name of your app

    def ready(self):
        import ProfileSection.signals  # Register the signals
