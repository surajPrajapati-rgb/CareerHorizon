# myapp/management/commands/seed_profiles.py

from django.core.management.base import BaseCommand
from faker import Faker
from django.contrib.auth.models import User
from ProfileSection.models import Profile, Experience, Education, SocialLink
import random

class Command(BaseCommand):
    help = 'Seed the database with fake profiles'

    def handle(self, *args, **kwargs):
        fake = Faker()

        job_titles = [
            'Software Engineer', 'Data Scientist', 'Machine Learning Engineer',
            'Artificial Intelligence Engineer', 'Deep Learning Engineer',
            'System Designer', 'DevOps Engineer', 'Docker Engineer',
            'Product Manager', 'Architect'
        ]

        # Create 100 users and their profiles
        for _ in range(100):
            # Create a User
            user = User.objects.create_user(
                username=fake.user_name(),
                password='password',  # You can generate a random password if desired
                email=fake.email()
            )
            
            # Create a Profile for that User
            profile = Profile.objects.create(
                user=user,
                name=fake.name(),
                user_type=fake.random_element(elements=('mentor', 'mentee')),
                phone_number=fake.phone_number(),
                date_of_birth=fake.date_of_birth(),
                gender=fake.random_element(elements=[
                    'male', 'female', 'non-binary', 'prefer_not_to_say'
                ]),
                headline=fake.sentence(),
                bio=fake.text(),
                country=fake.country(),
                profile_photo=None,  # You can generate random images if needed
                background_image=None,  # Same here
                created_at=fake.date_time_this_year(),
                last_login=fake.date_time_this_year()
            )

            # Add relevant experience
            for _ in range(random.randint(1, 3)):  # Random number of experiences (1 to 3)
                Experience.objects.create(
                    user=profile,
                    title=random.choice(job_titles),  # Random job title
                    company=fake.company(),
                    location=fake.city(),
                    start_date=fake.date_between(start_date='-10y', end_date='-1y'),
                    end_date=fake.date_between(start_date='-1y', end_date='today'),
                    description=fake.text(max_nb_chars=200)
                )

            # Add education (1 or 2 records)
            for _ in range(random.randint(1, 2)):
                Education.objects.create(
                    user=profile,
                    school=fake.company(),
                    degree=fake.random_element(elements=['BSc', 'MSc', 'PhD']),
                    field_of_study=fake.random_element(elements=[
                        'Computer Science', 'Data Science', 'Artificial Intelligence',
                        'Software Engineering', 'Information Technology', 'Cybersecurity',
                        'Product Management'
                    ]),
                    start_date=fake.date_between(start_date='-10y', end_date='-5y'),
                    end_date=fake.date_between(start_date='-4y', end_date='today'),
                    description=fake.text(max_nb_chars=200)
                )

            # Add social links (1 or 3 records)
            for _ in range(random.randint(1, 3)):
                SocialLink.objects.create(
                    user=profile,
                    platform=fake.random_element(elements=['linkedin', 'github', 'twitter']),
                    url=fake.url()
                )

        self.stdout.write(self.style.SUCCESS('Successfully seeded 100 profiles!'))
