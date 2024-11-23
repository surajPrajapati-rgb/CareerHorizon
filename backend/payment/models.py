from django.db import models
from mentorship.models import Mentor
from django.utils.timezone import now

class MentorBankDetails(models.Model):
    mentor = models.OneToOneField(Mentor, on_delete=models.CASCADE)
    razorpay_account_id = models.CharField(max_length=255, null=True, blank=True)
    account_holder_name = models.CharField(max_length=255)
    bank_account_number = models.CharField(max_length=50)
    ifsc_code = models.CharField(max_length=11)
    bank_name = models.CharField(max_length=255)

class Transaction(models.Model):
    payment_id = models.CharField(max_length=255,default="UNKNOWN")
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    platform_fee = models.DecimalField(max_digits=10, decimal_places=2)
    amount_to_mentor = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, default='pending')
    created_at = models.DateTimeField(default=now)  # Temporary field.
    transfer_status = models.CharField(max_length=50, default='pending')
