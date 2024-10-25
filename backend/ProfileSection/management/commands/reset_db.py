from django.core.management.base import BaseCommand
from django.apps import apps
from django.db import transaction

class Command(BaseCommand):
    help = 'Delete all data and reinitialize the database'

    def handle(self, *args, **kwargs):
        # Get all models from the app
        all_models = apps.get_models()

        with transaction.atomic():
            for model in all_models:
                try:
                    model.objects.all().delete()
                    self.stdout.write(self.style.SUCCESS(f'Successfully deleted all entries from {model.__name__}'))
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f'Error deleting entries from {model.__name__}: {e}'))
        
        # After deleting, you can run migrations to recreate tables
        self.stdout.write(self.style.SUCCESS('All data deleted. Running migrations...'))
        from django.core.management import call_command
        call_command('migrate')
        self.stdout.write(self.style.SUCCESS('Database reinitialized.'))
