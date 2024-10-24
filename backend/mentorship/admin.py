from django.contrib import admin

# Register your models here.

from .models import Mentor, MentorAvailability, MentorSkill, MentorCategory, Review, Message,Session,Payment
admin.site.register(Mentor)
admin.site.register(MentorAvailability)
admin.site.register(MentorSkill)
admin.site.register(MentorCategory)
admin.site.register(Review)
admin.site.register(Session)
admin.site.register(Payment)
admin.site.register(Message)
