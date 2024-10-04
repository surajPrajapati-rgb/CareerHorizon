from django.db import models
from django.utils import timezone

# Profile model
class Profile(models.Model):
    user_id = models.AutoField(primary_key=True)
    
    # Basic user info
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=255)
    user_type = models.CharField(max_length=12, choices=[
        ('student', 'Student'),
        ('professional', 'Professional')
    ])
    
    # Additional fields
    phone_number = models.CharField(max_length=30, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=50, choices=[
        ('male', 'Male'),
        ('female', 'Female'),
        ('non-binary', 'Non-binary'),
        ('prefer_not_to_say', 'Prefer not to say')
    ], blank=True, null=True)

    # Additional profile fields
    headline = models.CharField(max_length=255, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    profile_photo = models.ImageField(upload_to='profile_photos/', blank=True, null=True)

    # User engagement data
    interests = models.TextField(blank=True, null=True)  # Can store multiple interests as a comma-separated list
    created_at = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)
    
    # Preferences
    receive_newsletter = models.BooleanField(default=True)
    preferred_learning_mode = models.CharField(max_length=10, choices=[
        ('guided', 'Guided'),
        ('self-paced', 'Self-paced')
    ], default='guided')

    def __str__(self):
        return self.name


# Social media links model
class SocialMediaLinks(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='social_links')
    github_profile = models.URLField(max_length=255, blank=True, null=True)
    linkedin_profile = models.URLField(max_length=255, blank=True, null=True)
    twitter_profile = models.URLField(max_length=255, blank=True, null=True)
    portfolio_url = models.URLField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Social media links for {self.profile.name}"


# Professional details model
class ProfessionalDetails(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='professional_details')
    company_name = models.CharField(max_length=150, blank=True, null=True)
    job_title = models.CharField(max_length=100, blank=True, null=True)
    years_of_experience = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        return f"Professional details for {self.profile.name}"


# Student details model
class StudentDetails(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='student_details')
    university_name = models.CharField(max_length=150, blank=True, null=True)
    degree = models.CharField(max_length=100, blank=True, null=True)
    field_of_study = models.CharField(max_length=100, blank=True, null=True)
    graduation_year = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        return f"Student details for {self.profile.name}"
