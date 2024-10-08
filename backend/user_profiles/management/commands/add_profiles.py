from django.core.management.base import BaseCommand
from user_profiles.models import Profile, SocialMediaLinks, ProfessionalDetails, StudentDetails
from faker import Faker
import random

class Command(BaseCommand):
    help = 'Add 1000 profiles with computer science, management, system design, or marketing related data'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Define field-specific job titles and degrees
        cs_job_titles = ["Software Engineer", "Data Scientist", "Machine Learning Engineer", "Web Developer"]
        management_job_titles = ["Project Manager", "Operations Manager", "Business Analyst", "Product Manager"]
        design_job_titles = ["System Designer", "UI/UX Designer", "Product Designer", "Technical Architect"]
        marketing_job_titles = ["Digital Marketer", "Content Strategist", "SEO Specialist", "Brand Manager"]

        degrees = ["Computer Science", "Business Management", "System Design", "Marketing"]

        for _ in range(100):
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
                # Assign job titles based on fields of interest
                job_title = random.choice(cs_job_titles + management_job_titles + design_job_titles + marketing_job_titles)
                company_name = fake.company()

                ProfessionalDetails.objects.create(
                    profile=profile,
                    company_name=company_name,
                    job_title=job_title,
                    years_of_experience=random.randint(0, 30)
                )
            else:
                # Choose degree and field of study related to specified domains
                degree = random.choice(degrees)
                field_of_study = degree  # You could make this more specific if needed

                StudentDetails.objects.create(
                    profile=profile,
                    university_name=fake.company(),
                    degree=degree,
                    field_of_study=field_of_study,
                    graduation_year=random.randint(2020, 2025)
                )

        self.stdout.write(self.style.SUCCESS('1000 profiles related to computer science, management, system design, or marketing added successfully.'))
