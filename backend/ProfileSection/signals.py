from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    print(f"Signal triggered for user: {instance.username}, created: {created}")  # Debug log
    if created:
        Profile.objects.create(user=instance, name=instance.username)
        print(f"Profile created for user: {instance.username}")  # Debug log
    else:
        instance.profile.save()
        print(f"Profile updated for user: {instance.username}")  # Debug log
