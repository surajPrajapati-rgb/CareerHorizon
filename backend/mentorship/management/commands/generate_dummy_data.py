# mentoring_app/management/commands/generate_dummy_data.py
from django.core.management.base import BaseCommand
from . import create_dummy_data

class Command(BaseCommand):
    help = "Generate dummy mentor data for testing."

    def handle(self, *args, **kwargs):
        create_dummy_data(num_records=100)
        self.stdout.write(self.style.SUCCESS("Successfully created 1000 dummy mentor records."))
