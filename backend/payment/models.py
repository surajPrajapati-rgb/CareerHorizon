from django.db import models
from mentorship.models import Mentor, Payment  # Use Payment from mentorship


class MentorBankDetails(models.Model):
    mentor = models.OneToOneField(Mentor, on_delete=models.CASCADE, related_name='bank_details')
    account_holder_name = models.CharField(max_length=100)
    bank_account_number = models.CharField(max_length=20)
    ifsc_code = models.CharField(max_length=11)
    bank_name = models.CharField(max_length=100)
    razorpay_account_id = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Bank Details for {self.mentor.user.username}"


class Transaction(models.Model):
    payment = models.OneToOneField(Payment, on_delete=models.CASCADE, related_name='transaction')
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE, related_name='transactions')
    amount_paid = models.DecimalField(max_digits=8, decimal_places=2)
    platform_fee = models.DecimalField(max_digits=8, decimal_places=2)
    amount_to_mentor = models.DecimalField(max_digits=8, decimal_places=2)
    transfer_status = models.CharField(max_length=20, default="pending")
    transfer_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Transaction for Payment ID {self.payment.id} to Mentor {self.mentor.user.username}"
