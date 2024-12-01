

from django.db import models
from django.contrib.auth.models import User  # Assuming 'Users' refers to the default User model

class Mentor(models.Model):

    class Meta:
        db_table = 'Mentor'

    mentor_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # Assuming FK references the default User model
    mentor_name = models.CharField(max_length=100, default="Default Name")
    mentor_image_url = models.URLField(max_length=255, null=True, blank=True)
    bio = models.TextField(default="No bio provided")
    experience_years = models.IntegerField(default=0)
    hourly_rate = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    
    # ForeignKey with MentorCategory
    categories_id = models.ForeignKey('MentorCategory', on_delete=models.CASCADE, null=True, blank=True, related_name='mentors')

    linkedin_url = models.URLField(max_length=255, null=True, blank=True)
    education = models.CharField(max_length=255, default='Not specified')  # Set a default value

    created_at = models.DateTimeField(auto_now_add=True)  # Automatically sets the timestamp when created

    def __str__(self):
        return f"{self.user.username if self.user else 'No User'} - {self.industry}"

#for Availability slot
class MentorAvailability(models.Model):

    class Meta:
        db_table = 'MentorAvailability'

    DAYS_OF_WEEK = [
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
        ('Saturday', 'Saturday'),
        ('Sunday', 'Sunday'),
    ]

    availability_id = models.AutoField(primary_key=True)
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE,related_name='availability_slots')
    day_of_week = models.CharField(max_length=9, choices=DAYS_OF_WEEK)
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.mentor.user.username} - {self.day_of_week} ({self.start_time} to {self.end_time})"
    

class MentorCategory(models.Model):
    class Meta:
        db_table = 'MentorCategory'

    mentor_category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=100, default="General")  # Renamed to make it meaningful

    def __str__(self):
        return self.category_name



class MentorSkill(models.Model):

    class Meta:
        db_table = 'MentorSkill'

    mentor_skill_id = models.AutoField(primary_key=True)
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE,related_name='skills')
    skill_name = models.CharField(max_length=100)
    category = models.ForeignKey(MentorCategory, on_delete=models.CASCADE)  # This is important!

    def __str__(self):
        return f"{self.mentor.user.username} - {self.skill_name} ({self.category.category_name})"

# for reviews
class Review(models.Model):

    class Meta:
        db_table = 'Review'

    review_id = models.AutoField(primary_key=True)
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE,related_name='reviews')  # Assuming this references the Mentor model
    session_id = models.IntegerField()  # Assuming session_id is a simple Integer field, replace with ForeignKey if needed
    mentee = models.ForeignKey(User, on_delete=models.CASCADE)  # Assuming mentees are users in the User model
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])  # Rating options from 1 to 5
    title_review = models.CharField(max_length=100)  # Added title_review field
    feedback = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set to the current timestamp when created

    def __str__(self):
        return f"Review by {self.mentee.username} for {self.mentor.user.username} - Rating: {self.rating}"


# class Message(models.Model):

#     class Meta:
#         db_table = 'Message'

#     message_id = models.AutoField(primary_key=True)
#     sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')  # Reference to sender
#     receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')  # Reference to receiver
#     content = models.TextField()
#     sent_at = models.DateTimeField(auto_now_add=True)  # Automatically set timestamp when the message is sent

#     def __str__(self):
#         return f"Message from {self.sender.username} to {self.receiver.username} at {self.sent_at}"
    
    
    
class Session(models.Model):

    class Meta:
        db_table = 'Session'

    session_id = models.AutoField(primary_key=True)
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE,related_name='session')  # Reference to Mentor
    mentee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mentee_sessions')  # Reference to mentee
    appointment_id = models.IntegerField()  # Assuming appointment_id is an integer field, adjust if necessary
    session_topic = models.CharField(max_length=255)
    session_duration = models.IntegerField()  # Session duration in minutes
    session_notes = models.TextField()
    session_date = models.DateTimeField()

    def __str__(self):
        return f"Session: {self.session_topic} (Mentor: {self.mentor.user.username}, Mentee: {self.mentee.username})"
    
    
class Payment(models.Model):

    class Meta:
        db_table = 'Payment'
        
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    payment_id = models.AutoField(primary_key=True)
    mentee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')  # Reference to mentee
    session = models.ForeignKey(Session, on_delete=models.CASCADE)  # Reference to the session
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)  # Automatically sets the payment date
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    def __str__(self):
        return f"Payment by {self.mentee.username} for session {self.session.session_id} - {self.status}"


