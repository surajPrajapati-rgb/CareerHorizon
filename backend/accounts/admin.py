from django.contrib import admin
from .models import Account
from django.contrib.auth.admin import UserAdmin
# Register your models here.

class AccountAdmin(UserAdmin):

    list_display = ('email', 'first_name', 'last_name', 'username','date_joined','last_login','is_active')
    list_filter = ('is_staff', 'is_active',)
    # list_filter_link = ('email', 'first_name', 'last_name', 'username',)
    fieldsets = (
        (None, {'fields': ('email', 'password',)}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'username', 'mobile')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_admin', 'is_superadmin')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'first_name', 'last_name', 'password1', 'password2', 'is_staff', 'is_active', 'is_admin', 'is_superadmin')}
        ),
    )
    search_fields = ('email',)
    ordering = ('-date_joined',)
    filter_horizontal = ()

admin.site.register(Account, AccountAdmin)