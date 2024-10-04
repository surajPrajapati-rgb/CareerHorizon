from django.contrib import admin

# Register your models here.
from django.contrib import admin

# Register your models here.
from .models import Profile, SocialMediaLinks, StudentDetails, ProfessionalDetails
admin.site.register(Profile)
admin.site.register(SocialMediaLinks)
admin.site.register(StudentDetails)
admin.site.register(ProfessionalDetails)

