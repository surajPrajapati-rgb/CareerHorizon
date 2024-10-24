from django.core.management.base import BaseCommand
from faker import Faker
from mentorship.models import Mentor, MentorSkill, MentorCategory, User

# Define the command class
class Command(BaseCommand):
    help = 'Generate fake mentors and skills'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Define categories and related skills
        categories_and_skills = {
            "Computer Science": ["Algorithms", "Data Structures", "Software Development"],
            "System Design": ["Architectural Patterns", "Microservices", "Database Design"],
            "Management": ["Project Management", "Team Leadership"],
            "HR": ["Recruitment", "Employee Relations"],
            "Product Management": ["Product Roadmap", "Feature Prioritization"],
            "User Design": ["UI/UX Design", "Wireframing"],
            "Soft Skills": ["Communication", "Teamwork"],
            "Marketing": ["SEO", "Content Strategy"],
            "Design": ["Graphic Design", "Branding"],
            "Sales": ["Sales Strategy", "Client Relations"],
            "Data Science": ["Machine Learning", "Data Analysis"]
        }

        for _ in range(10):  # Number of mentors to generate
            # Create a user and a mentor
            user = User.objects.create_user(username=fake.user_name(), email=fake.email())
            mentor = Mentor.objects.create(
                user=user,
                bio=fake.text(),
                experience_years=fake.random_int(min=1, max=20),
                hourly_rate=fake.random_number(digits=3),
                industry=fake.random_element(list(categories_and_skills.keys())),
                linkedin_url=fake.url(),
                education=fake.random_element(["BSc", "MSc", "PhD"])
            )

            # Pick a random category for the mentor
            category_name = fake.random_element(list(categories_and_skills.keys()))
            category, _ = MentorCategory.objects.get_or_create(mentor=mentor, category_name=category_name)

            # Assign random skills to the mentor under the chosen category
            skills = fake.random_elements(elements=categories_and_skills[category_name], length=2)
            for skill in skills:
                MentorSkill.objects.create(mentor=mentor, skill_name=skill, category=category)

            self.stdout.write(self.style.SUCCESS(f'Created mentor {user.username} with skills in {category_name}'))
