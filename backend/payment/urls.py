# payment/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('create-payment/<int:mentor_id>/', views.create_payment, name='create_payment'),
]
