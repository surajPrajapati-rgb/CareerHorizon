from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from ProfileSection.models import Profile, Experience, Education, SocialLink
from faker import Faker
import random

class Command(BaseCommand):
    help = 'Create fake data for software-related people'

    def handle(self, *args, **kwargs):
        fake = Faker()

        used_usernames = set()
        used_emails = set()

        for _ in range(10):  # Create 10 fake users
            username = fake.user_name()
            email = fake.email()

            # Ensure unique username and email
            while username in used_usernames:
                username = fake.user_name()
            used_usernames.add(username)

            while email in used_emails:
                email = fake.email()
            used_emails.add(email)

            # Create the user
            user = User.objects.create_user(
                username=username,
                email=email,
                password='password123'
            )

            # Create or update the profile
            profile, created = Profile.objects.update_or_create(
                user=user,
                defaults={
                    'name': fake.name(),
                    'user_type': random.choice(['mentor', 'mentee']),
                    'phone_number': fake.phone_number(),
                    'date_of_birth': fake.date_of_birth(minimum_age=22, maximum_age=45),
                    'gender': random.choice(['male', 'female', 'non-binary', 'prefer_not_to_say']),
                    'headline': fake.job(),
                    'bio': fake.paragraph(nb_sentences=3),
                    'country': fake.country(),
                    # Make the last_login datetime timezone-aware
                    'last_login': timezone.make_aware(fake.date_time_this_year())
                }
            )

            # Add experiences, education, and social links as before
            for _ in range(random.randint(1, 3)):
                Experience.objects.create(
                    user=profile,
                    title=random.choice([
                        'Data Scientist', 
                        'AI Engineer', 
                        'Machine Learning Engineer', 
                        'Backend Developer', 
                        'System Designer', 
                        'Data Analyst', 
                        'HR Manager', 
                        'Full Stack Developer'
                    ]),
                    company=fake.company(),
                    location=fake.city(),
                    start_date=fake.date_between(start_date='-5y', end_date='-2y'),
                    end_date=fake.date_between(start_date='-2y', end_date='today'),
                    description=fake.text(max_nb_chars=200)
                )

            # Adding fake education
            for _ in range(random.randint(1, 2)):
                Education.objects.create(
                    user=profile,
                    school=fake.company(),
                    degree=random.choice(['BSc', 'MSc', 'PhD']),
                    field_of_study=random.choice([
                        'Computer Science', 
                        'Data Science', 
                        'Information Technology', 
                        'Artificial Intelligence',
                        'Machine Learning',
                        'HR Management'
                    ]),
                    start_date=fake.date_between(start_date='-10y', end_date='-6y'),
                    end_date=fake.date_between(start_date='-5y', end_date='today'),
                    description=fake.text(max_nb_chars=200)
                )

            # Adding fake social links
            platforms = ['linkedin', 'github', 'twitter', 'website']
            for platform in platforms:
                SocialLink.objects.create(
                    user=profile,
                    platform=platform,
                    url=fake.url()
                )

        self.stdout.write(self.style.SUCCESS('Successfully created fake data'))
