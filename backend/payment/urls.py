from django.urls import path
from . import views

urlpatterns = [
    path('stripe/create-account/<int:mentor_id>/', views.create_razorpay_account, name='create_razorpay_account'),
    path('process-payment/<int:payment_id>/', views.process_payment, name='process_payment'),
    path('update-bank-details/<int:mentor_id>/', views.update_mentor_bank_details, name='update_mentor_bank_details'),
]
