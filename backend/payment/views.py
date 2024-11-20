from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import MentorBankDetails, Transaction
from mentorship.models import Mentor, Payment  # Use Payment from mentorship
import json
import razorpay
# Import the correct error classes
from razorpay.errors import BadRequestError

import datetime
from decimal import Decimal
# Razorpay client initialization
razorpay_client = razorpay.Client(auth=("rzp_test_tyiIYChwrMBfmK", "5pTM1XyFru0Jzt4xNkryb4AP"))


@csrf_exempt
def create_razorpay_account(request, mentor_id):
    """
    Create Razorpay account for the mentor and link it with mentor's bank details.
    """
    try:
        # Fetch the mentor using the correct field 'mentor_id'
        mentor = Mentor.objects.get(mentor_id=mentor_id)

        # Prepare the data for creating the Razorpay account
        account_data = {
            "type": "express",  # Type of account (express or standard)
            "country": "IN",  # Country of the mentor (India)
            "email": mentor.user.email,  # Email of the mentor
        }

        # Log the request data
        print("Sending request to create Razorpay account with data:", account_data)

        # Make the API call to create the Razorpay account
        account = razorpay_client.account.create(account_data)

        # Log the response data
        print("Razorpay account created:", account)

        # Fetch or create the bank details
        bank_details, created = MentorBankDetails.objects.get_or_create(mentor=mentor)

        # Store Razorpay account ID in the bank details model
        bank_details.razorpay_account_id = account['id']
        bank_details.save()

        return JsonResponse({"success": True, "account_id": account['id']})

    except Mentor.DoesNotExist:
        return JsonResponse({"error": "Mentor not found"}, status=404)

    except BadRequestError as e:
        # Log the detailed error information for debugging
        print("BadRequestError:", e)
        return JsonResponse({
            "error": "Bad Request: Access Denied",
            "details": str(e)
        }, status=400)

    except razorpay.errors.UnauthorizedError as e:
        print("UnauthorizedError:", e)
        return JsonResponse({
            "error": "Unauthorized: API key or account issue",
            "details": str(e)
        }, status=401)

    except Exception as e:
        # Log the exception to better understand the issue
        print("An unexpected error occurred:", e)
        return JsonResponse({
            "error": f"An error occurred: {str(e)}",
            "details": str(e)
        }, status=500)

        

@csrf_exempt
def update_mentor_bank_details(request, mentor_id):
    """
    API to update Mentor's Bank Details.
    """
    if request.method == 'POST':
        try:
            # Parse request body
            data = json.loads(request.body)

            # Validate required fields
            required_fields = [
                "account_holder_name", "bank_account_number", "ifsc_code", "bank_name"
            ]
            for field in required_fields:
                if field not in data:
                    return JsonResponse({"error": f"Missing field: {field}"}, status=400)

            # Fetch mentor instance
            mentor = Mentor.objects.get(id=mentor_id)

            # Fetch or create MentorBankDetails instance
            bank_details, created = MentorBankDetails.objects.get_or_create(mentor=mentor)

            # Update the bank details
            bank_details.account_holder_name = data["account_holder_name"]
            bank_details.bank_account_number = data["bank_account_number"]
            bank_details.ifsc_code = data["ifsc_code"]
            bank_details.bank_name = data["bank_name"]

            # Save the updated details
            bank_details.save()

            return JsonResponse({
                "success": True,
                "message": "Bank details updated successfully",
                "bank_details": {
                    "account_holder_name": bank_details.account_holder_name,
                    "bank_account_number": bank_details.bank_account_number,
                    "ifsc_code": bank_details.ifsc_code,
                    "bank_name": bank_details.bank_name,
                },
            })

        except Mentor.DoesNotExist:
            return JsonResponse({"error": "Mentor not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)
      

@csrf_exempt
def process_payment(request, payment_id):
    """
    API to process payment and transfer amount to mentor.
    """
    try:
        payment = Payment.objects.get(id=payment_id)
        platform_fee_percentage = 10  # Set the platform fee percentage
        platform_fee = (payment.amount * Decimal(platform_fee_percentage)) / 100
        amount_to_mentor = payment.amount - platform_fee

        if payment.status != 'pending':
            return JsonResponse({"error": "Payment has already been processed"})

        # Transfer to mentor
        mentor = payment.session.mentor
        bank_details = MentorBankDetails.objects.get(mentor=mentor)

        if not bank_details.razorpay_account_id:
            return JsonResponse({"error": "Mentor has not linked their Razorpay account"})

        payout_payload = {
            "account_number": "YOUR_ACCOUNT_NUMBER",  # Replace with Razorpay account number
            "fund_account_id": bank_details.razorpay_account_id,
            "amount": int(amount_to_mentor * 100),  # Amount in paise
            "currency": "INR",
            "mode": "IMPS",  # Instant payment
            "purpose": "payout",
            "queue_if_low_balance": True,
            "notes": {
                "mentor": mentor.user.username,
                "platform_fee": str(platform_fee),
            },
        }

        payout = razorpay_client.payout.create(payout_payload)

        # Update payment and transaction records
        payment.status = 'completed'
        payment.save()

        transaction = Transaction.objects.create(
            payment=payment,
            mentor=mentor,
            amount_paid=payment.amount,
            platform_fee=platform_fee,
            amount_to_mentor=amount_to_mentor,
            transfer_status="completed",
            transfer_date=datetime.datetime.now(),
        )

        return JsonResponse({"success": True, "payout_id": payout["id"], "transaction_id": transaction.id})

    except Payment.DoesNotExist:
        return JsonResponse({"error": "Payment not found"}, status=404)
    except MentorBankDetails.DoesNotExist:
        return JsonResponse({"error": "Mentor bank details not found"}, status=404)
    except razorpay.errors.BadRequestError as e:
        return JsonResponse({"error": str(e)}, status=400)
