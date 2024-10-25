from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Profile(models.Model):

    class Meta:
        db_table = 'UserProfile'

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # user_id = models.AutoField(primary_key=True)
    # Basic user info
    name = models.CharField(max_length=100)
    user_type = models.CharField(max_length=12, choices=[
        ('mentor', 'Mentor'),
        ('mentee', 'Mentee'),
    ])
    
    # Additional profile details
    phone_number = models.CharField(max_length=30, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=50, choices=[
        ('male', 'Male'),
        ('female', 'Female'),
        ('non-binary', 'Non-binary'),
        ('prefer_not_to_say', 'Prefer not to say')
    ], blank=True, null=True)
    
    # Profile info similar to LinkedIn
    headline = models.CharField(max_length=255, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    
    # Images
    profile_photo = models.ImageField(upload_to='ProfileSection/media/profile_photos/', blank=True, null=True)
    background_image = models.ImageField(upload_to='ProfileSection/media/background_images/', blank=True, null=True)

    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.name

# Experience model
class Experience(models.Model):

    class Meta:
        db_table = 'UserExperience'
    
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='experiences')  # Link to Profile via user_id
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f'{self.title} at {self.company}'

# Education model
class Education(models.Model):

    class Meta:
        db_table = 'UserEducation'

    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='education')  # Link to Profile via user_id
    school = models.CharField(max_length=255)
    degree = models.CharField(max_length=255, blank=True, null=True)
    field_of_study = models.CharField(max_length=255, blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'{self.degree} at {self.school}'

# Social Links model
class SocialLink(models.Model):

    class Meta:
        db_table = 'UserSocialLink'

    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='social_links')  # Link to Profile via user_id
    platform = models.CharField(max_length=50, choices=[
        ('linkedin', 'LinkedIn'),
        ('github', 'GitHub'),
        ('twitter', 'Twitter'),
        ('facebook', 'Facebook'),
        ('instagram', 'Instagram'),
        ('website', 'Personal Website'),
    ])
    url = models.URLField()

    def __str__(self):
        return f'{self.platform} - {self.url}'
