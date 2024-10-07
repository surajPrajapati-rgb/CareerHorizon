from django.db import models
from django.utils import timezone
from user_profiles.models import Profile

# Mentor Model
class Mentor(models.Model):
    mentor_id = models.AutoField(primary_key=True)  # Custom primary key

    name = models.CharField(max_length=100)
    profile_photo = models.ImageField(upload_to='mentor_photos/', blank=True, null=True)
    graduation_year = models.IntegerField(blank=True, null=True)
    field_of_study = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    academic_stream = models.CharField(max_length=100)
    bio = models.TextField(blank=True, null=True)
    preferred_mentee_year = models.CharField(max_length=50, blank=True, null=True)
    mentoring_frequency = models.CharField(max_length=50, blank=True, null=True)
    session_duration = models.CharField(max_length=50, blank=True, null=True)
    contact_mode = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# Mentor Availability Slot Model
class AvailabilitySlot(models.Model):
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE, related_name="availability_slots")
    day_of_week = models.CharField(max_length=10, choices=[
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
        ('Saturday', 'Saturday'),
        ('Sunday', 'Sunday')
    ])
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.day_of_week} ({self.start_time} - {self.end_time}) for {self.mentor.name}"

# Expertise Model
class Expertise(models.Model):
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE, related_name="expertise_areas")
    topic = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.topic} (Mentor: {self.mentor.name})"

# Experience Model
class Experience(models.Model):
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE, related_name="experiences")
    organization = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    field = models.CharField(max_length=100, blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)  # nullable for current job
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.role} at {self.organization} (Mentor: {self.mentor.name})"

# Education Model
class Education(models.Model):
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE, related_name="education")
    institution_name = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    field_of_study = models.CharField(max_length=100)
    start_year = models.IntegerField()
    end_year = models.IntegerField(blank=True, null=True)  # nullable for ongoing education

    def __str__(self):
        return f"{self.degree} in {self.field_of_study} at {self.institution_name} (Mentor: {self.mentor.name})"


# Mentor Sessions Model
class MentorSession(models.Model):
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE, related_name="sessions")
    mentee = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="sessions")
    session_date = models.DateTimeField()
    duration = models.CharField(max_length=50, blank=True, null=True)  # e.g., "<30 mins"
    status = models.CharField(max_length=50, choices=[
        ('Scheduled', 'Scheduled'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled')
    ], default='Scheduled')
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Session between {self.mentor.name} and {self.mentee.name} on {self.session_date}"
