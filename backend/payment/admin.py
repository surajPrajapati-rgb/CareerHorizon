from django.contrib import admin
from .models import MentorBankDetails, Transaction

@admin.register(MentorBankDetails)
class MentorBankDetailsAdmin(admin.ModelAdmin):
    list_display = ('mentor', 'account_holder_name', 'bank_name', 'bank_account_number', 'ifsc_code')
    search_fields = ('mentor__name', 'bank_name', 'account_holder_name')  # Assuming Mentor has a `name` field.

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('payment_id', 'mentor', 'amount_paid', 'platform_fee', 'amount_to_mentor', 'status', 'created_at', 'transfer_status')
    list_filter = ('status', 'transfer_status', 'created_at')
    search_fields = ('payment_id', 'mentor__name')  # Assuming Mentor has a `name` field.
