from datetime import datetime, timedelta, timezone  # Added timezone from datetime
from faker import Faker
import random
from django.utils import timezone as django_timezone  # Renamed to avoid conflict with datetime's timezone
from backend.ProfileSection.models import Profile
from mentorship.models import Mentor, AvailabilitySlot, Expertise, Experience, Education, MentorSession

fake = Faker()

# Ensure you have at least one mentee profile to associate with sessions
mentee_profile = Profile.objects.first()
if not mentee_profile:
    print("Please create at least one mentee profile in the database.")
    exit()

def create_dummy_data(num_records=100):
    for _ in range(num_records):
        # Step 1: Create Mentor
        mentor = Mentor.objects.create(
            name=fake.name(),
            graduation_year=random.randint(2000, 2022),
            field_of_study=fake.job().replace("Developer", "Software").replace("Engineer", "Engineering"),
            degree=random.choice(["Bachelor's", "Master's", "Ph.D."]),
            academic_stream=fake.catch_phrase(),
            bio=fake.paragraph(nb_sentences=3),
            preferred_mentee_year=random.choice(["1st Year", "2nd Year", "3rd Year", "Final Year"]),
            mentoring_frequency=random.choice(["Weekly", "Twice a month", "Once a month"]),
            session_duration=random.choice(["30 mins", "45 mins", "1 hour"]),
            contact_mode=random.choice(["Online", "In-person", "Hybrid"]),
            created_at=fake.date_time_this_decade(),
            updated_at=fake.date_time_this_decade(),
        )

        # Step 2: Add Availability Slots for each mentor
        for _ in range(random.randint(1, 3)):  # Each mentor can have 1-3 slots
            day_of_week = random.choice(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
            start_time = fake.time_object()
            end_time = (datetime.combine(datetime.today(), start_time) + timedelta(hours=1)).time()
            AvailabilitySlot.objects.create(
                mentor=mentor,
                day_of_week=day_of_week,
                start_time=start_time,
                end_time=end_time
            )

        # Step 3: Add Expertise for each mentor
        for _ in range(random.randint(1, 3)):
            Expertise.objects.create(
                mentor=mentor,
                topic=fake.bs().title(),
                description=fake.paragraph(nb_sentences=2)
            )

        # Step 4: Add Experience for each mentor
        for _ in range(random.randint(1, 3)):
            Experience.objects.create(
                mentor=mentor,
                organization=fake.company(),
                role=fake.job().replace("Developer", "Software").replace("Engineer", "Engineering"),
                field=fake.word(ext_word_list=['Software Development', 'AI', 'Data Science', 'Cloud Computing']),
                start_date=fake.date_between(start_date="-10y", end_date="-1y"),
                end_date=fake.date_between(start_date="-1y", end_date="today") if random.choice([True, False]) else None,
                description=fake.paragraph(nb_sentences=3)
            )

        # Step 5: Add Education for each mentor
        for _ in range(random.randint(1, 2)):
            Education.objects.create(
                mentor=mentor,
                institution_name=fake.company() + " University",
                degree=random.choice(["B.Sc", "M.Sc", "Ph.D."]),
                field_of_study=fake.word(ext_word_list=['Computer Science', 'Software Engineering', 'Data Science', 'AI']),
                start_year=random.randint(2000, 2020),
                end_year=random.randint(2021, 2023)
            )

        # Step 6: Add Mentor Sessions
        for _ in range(random.randint(1, 5)):  # Each mentor can have 1-5 sessions
            session_date = fake.date_time_this_year(before_now=False, after_now=True, tzinfo=timezone.utc)
            MentorSession.objects.create(
                mentor=mentor,
                mentee=mentee_profile,
                session_date=session_date,
                duration=random.choice(["30 mins", "45 mins", "1 hour"]),
                status=random.choice(["Scheduled", "Completed", "Cancelled"]),
                notes=fake.sentence()
            )

    print(f"{num_records} mentor records with related data created successfully.")
    
# Call function to generate data
create_dummy_data()