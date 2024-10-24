
# Register your models here.
from django.contrib import admin

from .models import Profile, Experience, Education, SocialLink
admin.site.register(Profile)
admin.site.register(Experience)
admin.site.register(Education)
admin.site.register(SocialLink)

