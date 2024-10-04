from django.core.management.base import BaseCommand
from user_profiles.models import Profile, SocialMediaLinks, ProfessionalDetails, StudentDetails
from faker import Faker
import random

class Command(BaseCommand):
    help = 'Add 1000 profiles with related data'

    def handle(self, *args, **kwargs):
        fake = Faker()

        for _ in range(1000):
            profile = Profile.objects.create(
                name=fake.name(),
                email=fake.unique.email(),
                password_hash=fake.password(),
                user_type=random.choice(['student', 'professional']),
                phone_number=fake.phone_number(),
                date_of_birth=fake.date_of_birth(),
                gender=random.choice(['male', 'female', 'non-binary', 'prefer_not_to_say']),
                headline=fake.sentence(),
                bio=fake.text(),
                profile_photo=None,  # Replace with a file path if needed
                interests=", ".join(fake.words(nb=random.randint(1, 5))),
                created_at=fake.date_time_this_decade(),
                last_login=fake.date_time_this_decade(),
                receive_newsletter=fake.boolean(),
                preferred_learning_mode=random.choice(['guided', 'self-paced'])
            )

            SocialMediaLinks.objects.create(
                profile=profile,
                github_profile=fake.url(),
                linkedin_profile=fake.url(),
                twitter_profile=fake.url(),
                portfolio_url=fake.url()
            )

            if profile.user_type == 'professional':
                ProfessionalDetails.objects.create(
                    profile=profile,
                    company_name=fake.company(),
                    job_title=fake.job(),
                    years_of_experience=random.randint(0, 30)
                )
            else:
                StudentDetails.objects.create(
                    profile=profile,
                    university_name=fake.company(),
                    degree=fake.word(),
                    field_of_study=fake.word(),
                    graduation_year=random.randint(2020, 2025)
                )

        self.stdout.write(self.style.SUCCESS('1000 profiles added successfully.'))
