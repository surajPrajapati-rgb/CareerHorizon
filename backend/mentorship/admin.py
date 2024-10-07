from django.contrib import admin

# Register your models here.

from .models import Mentor, AvailabilitySlot, Expertise, Experience, Education, MentorSession
admin.site.register(Mentor)
admin.site.register(AvailabilitySlot)
admin.site.register(Expertise)
admin.site.register(Experience)
admin.site.register(Education)
admin.site.register(MentorSession)