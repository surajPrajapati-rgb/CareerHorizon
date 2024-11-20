from django.contrib import admin
from .models import MentorBankDetails, Transaction


@admin.register(MentorBankDetails)
class MentorBankDetailsAdmin(admin.ModelAdmin):
    list_display = ('mentor', 'account_holder_name', 'bank_name', 'razorpay_account_id')


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('payment', 'mentor', 'amount_paid', 'platform_fee', 'amount_to_mentor', 'transfer_status')
    list_filter = ('transfer_status', 'transfer_date')
