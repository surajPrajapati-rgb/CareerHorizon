# payment/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import MentorBankDetails, Transaction
from mentorship.models import Mentor
import json
import razorpay
from razorpay.errors import BadRequestError
from decimal import Decimal

razorpay_client = razorpay.Client(auth=("rzp_test_jrhUMjijQQywXQ", "vAWsD9TOjoc9SAWbVQ3jUJjX"))

@csrf_exempt
def create_payment(request, mentor_id):
    """
    Create Razorpay order for mentor payment.
    """
    if request.method == "POST":
        try:
            mentor = Mentor.objects.get(mentor_id=mentor_id)
            hourly_rate = mentor.hourly_rate
            amount = hourly_rate * 100
            platform_fee = Decimal(amount) * Decimal(0.1)

            # Create Razorpay order
            order_data = {
                "amount": float(amount),
                "currency": "INR",
                "receipt": f"order_rcpt_{mentor_id}",
                "payment_capture": 1  # Auto capture payment
            }
            razorpay_order = razorpay_client.order.create(order_data)

            # Save transaction details
            transaction = Transaction.objects.create(
                payment_id=razorpay_order["id"],
                mentor=mentor,
                amount_paid= float(amount),  # The total amount paid by the mentee
                platform_fee= float(platform_fee),
                amount_to_mentor= amount - platform_fee,
                status="pending",
            )

            return JsonResponse({"success": True, "order_id": razorpay_order["id"]})

        except Mentor.DoesNotExist:
            return JsonResponse({"error": "Mentor not found"}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


