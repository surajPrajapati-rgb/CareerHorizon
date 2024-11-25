from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Message
from django.db.models import Q
import json
from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponse
from rest_framework import status

@api_view(['GET'])
def chat_history(request, username):
    try:
        # Get the other user by username
        other_user = User.objects.filter(username=username).first()
        sender_email = request.query_params.get('sender')
        user = User.objects.filter(username=sender_email).first()

        if not sender_email:
            return Response(
                {"detail": "Sender email is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        if not other_user:
            return Response({'status': 'error', 'message': 'User not found.'}, status=404)
        print("Sender email", sender_email)
        print("reciept email", username)

        # Fetch chat messages between the authenticated user and the other user
        messages = Message.objects.filter(
            Q(sender=user, recipient=other_user) |
            Q(sender=other_user, recipient=user)
        ).order_by('timestamp')

        data = [
            {
                'id': msg.id,
                'sender': msg.sender.username,
                'recipient': msg.recipient.username if msg.recipient else None,
                'content': msg.content,
                'timestamp': msg.timestamp.isoformat(),
            }
            for msg in messages
        ]
        return Response(data, status=200)

    except Exception as e:
        return Response({'status': 'error', 'message': str(e)}, status=500)


@api_view(['GET'])
def chat_users(request):
    sender_email = request.query_params.get('sender')
    user = User.objects.filter(username=sender_email).first()
    # Get all unique users that the sender has communicated with (either sent or received messages)
    sent_users = Message.objects.filter(sender=user).values_list('recipient', flat=True).distinct()
    received_users = Message.objects.filter(recipient=user).values_list('sender', flat=True).distinct()

    # Combine both sets of users and remove duplicates
    user_ids = set(sent_users) | set(received_users)
    users = User.objects.filter(id__in=user_ids)

    # Prepare the response data
    data = [{'username': user.username, 'id': user.id} for user in users]
    return JsonResponse(data, safe=False)


@api_view(['POST'])
def create_message(request):
    try:
        # Extract data from request
        data = json.loads(request.body)
        sender_email = data.get('sender')  # Extract sender from the request body
        recipient_username = data.get('recipient')
        content = data.get('content')

        # Validate input
        if not sender_email or not recipient_username or not content:
            return Response({'status': 'error', 'message': 'Sender, recipient, and content are required.'}, status=400)

        # Get sender and recipient users
        sender = User.objects.filter(email=sender_email).first()
        recipient = User.objects.filter(username=recipient_username).first()

        if not sender:
            return Response({'status': 'error', 'message': 'Sender not found.'}, status=404)
        if not recipient:
            return Response({'status': 'error', 'message': 'Recipient not found.'}, status=404)

        # Create and save the message
        message = Message(
            sender=sender,
            recipient=recipient,
            content=content,
            room_name=f"{sender.username}_{recipient.username}",
        )
        message.save()

        return Response({'status': 'success', 'message_id': message.id, 'message': 'Message sent successfully.'}, status=201)

    except Exception as e:
        return Response({'status': 'error', 'message': str(e)}, status=500)


@api_view(['GET'])
def sent_messages(request):
    try:
        # Fetch messages sent by the authenticated user
        messages = Message.objects.filter(sender=request.user).order_by('-timestamp')
        data = [
            {
                'id': msg.id,
                'recipient': msg.recipient.username if msg.recipient else None,
                'room_name': msg.room_name,
                'content': msg.content,
                'timestamp': msg.timestamp,
            }
            for msg in messages
        ]
        return Response(data, status=200)

    except Exception as e:
        return Response({'status': 'error', 'message': str(e)}, status=500)


@api_view(['GET'])
def received_messages(request):
    try:
        # Fetch messages received by the authenticated user
        messages = Message.objects.filter(recipient=request.user).order_by('-timestamp')
        data = [
            {
                'id': msg.id,
                'sender': msg.sender.username if msg.sender else None,
                'room_name': msg.room_name,
                'content': msg.content,
                'timestamp': msg.timestamp,
            }
            for msg in messages
        ]
        return Response(data, status=200)

    except Exception as e:
        return Response({'status': 'error', 'message': str(e)}, status=500)


@api_view(['GET', 'PUT', 'DELETE'])
def message_detail(request, message_id):
    message = get_object_or_404(Message, id=message_id)
    print(f"Request User: {request.user.username}")
    print(f"Message Sender: {message.sender.username}")
    print(f"Message Recipient: {message.recipient.username if message.recipient else None}")

    # Ensure the user has permission to view or modify the message
    # if message.sender != request.user and message.recipient != request.user:
    #     return HttpResponseForbidden()

    if request.method == 'GET':
        data = {
            'id': message.id,
            'sender': message.sender.username,
            'recipient': message.recipient.username if message.recipient else None,
            'room_name': message.room_name,
            'content': message.content,
            'timestamp': message.timestamp
        }
        return JsonResponse(data)

    elif request.method == 'PUT':
        data = json.loads(request.body)
        print(data)
        message.content = data.get('content', message.content)
        message.save()
        return JsonResponse({'status': 'success', 'message': 'Message updated successfully.'})

    elif request.method == 'DELETE':
        message.delete()
        return JsonResponse({'status': 'success', 'message': 'Message deleted successfully.'})

    return HttpResponse(status=405)




# @csrf_exempt
# @login_required
# def create_message(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         recipient_username = data.get('recipient')
#         content = data.get('content')

#         recipient = User.objects.filter(username=recipient_username).first()
#         if not recipient:
#             return JsonResponse({'status': 'error', 'message': 'Recipient not found'}, status=404)
        
#         if not content:
#             return JsonResponse({'status': 'error', 'message': 'Content cannot be empty'}, status=400)

#         # Create and save the message
#         message = Message(
#             sender=request.user,
#             recipient=recipient,
#             content=content,
#             room_name=f"{request.user.username}_{recipient.username}"
#         )
#         message.save()
#         return JsonResponse({'status': 'success', 'message': 'Message sent successfully'}, status=201)

#     return HttpResponse(status=405)

# # # Create a message
# # @csrf_exempt
# # @login_required
# # def create_message(request):
# #     print("Received a POST request to create a message.")
# #     print("Request body:", request.body)
# #     if request.method == 'POST':
# #         data = json.loads(request.body)
# #         form = MessageForm(data)
# #         if form.is_valid():
# #             message = form.save(commit=False)
# #             message.sender = request.user
# #             message.save()
# #             return JsonResponse({'status': 'success', 'message': 'Message sent successfully.'}, status=201)
# #         else:
# #             return JsonResponse({'status': 'error', 'errors': form.errors}, status=400)
# #     return HttpResponse(status=405)

# # List all messages sent by the user
# @login_required
# def sent_messages(request):
#     messages = Message.objects.filter(sender=request.user).order_by('-timestamp')
#     data = [{'id': msg.id, 'recipient': msg.recipient.username if msg.recipient else None, 'room_name': msg.room_name, 'content': msg.content, 'timestamp': msg.timestamp} for msg in messages]
#     return JsonResponse(data, safe=False)

# # List all messages received by the user
# @login_required
# def received_messages(request):
#     messages = Message.objects.filter(recipient=request.user).order_by('-timestamp')
#     data = [{'id': msg.id, 'sender': msg.sender.username, 'room_name': msg.room_name, 'content': msg.content, 'timestamp': msg.timestamp} for msg in messages]
#     return JsonResponse(data, safe=False)

# # Retrieve, update, or delete a specific message
# @csrf_exempt
# @login_required
# def message_detail(request, message_id):
#     # print(type(message_id))
#     message = get_object_or_404(Message, id=message_id)
#     # Inside your message_detail view:
#     print(f"Request User: {request.user.username}")
#     print(f"Message Sender: {message.sender.username}")
#     print(f"Message Recipient: {message.recipient.username if message.recipient else None}")

#     # Ensure the user has permission to view or modify the message
#     # if message.sender != request.user and message.recipient != request.user:
#     #     return HttpResponseForbidden()

#     if request.method == 'GET':
#         data = {
#             'id': message.id,
#             'sender': message.sender.username,
#             'recipient': message.recipient.username if message.recipient else None,
#             'room_name': message.room_name,
#             'content': message.content,
#             'timestamp': message.timestamp
#         }
#         return JsonResponse(data)

#     elif request.method == 'PUT':
#         data = json.loads(request.body)
#         print(data)
#         message.content = data.get('content', message.content)
#         message.save()
#         return JsonResponse({'status': 'success', 'message': 'Message updated successfully.'})

#     elif request.method == 'DELETE':
#         message.delete()
#         return JsonResponse({'status': 'success', 'message': 'Message deleted successfully.'})

#     return HttpResponse(status=405)

# @csrf_exempt
# @login_required
# def chat_users(request):
#     # Get all unique users that the sender has communicated with (either sent or received messages)
#     sent_users = Message.objects.filter(sender=request.user).values_list('recipient', flat=True).distinct()
#     received_users = Message.objects.filter(recipient=request.user).values_list('sender', flat=True).distinct()

#     # Combine both sets of users and remove duplicates
#     user_ids = set(sent_users) | set(received_users)
#     users = User.objects.filter(id__in=user_ids)

#     # Prepare the response data
#     data = [{'username': user.username, 'id': user.id} for user in users]
#     return JsonResponse(data, safe=False)


# @api_view(['GET'])
# @login_required
# def chat_history(request, username):
#     # Extract sender email from query parameters
#     sender_email = request.GET.get('sender')
#     recipient_email = username
#     print(f"Sender Email: {sender_email}, Recipient Email: {recipient_email}")
    
#     # Validate the presence of sender and recipient emails
#     if not sender_email or not recipient_email:
#         return Response(
#             {'error': 'Sender and recipient emails are required.'},
#             status=400
#         )

#     try:
#         # Get the sender and recipient user objects
#         sender = User.objects.get(email=sender_email)
#         recipient = User.objects.get(email=recipient_email)
#     except User.DoesNotExist:
#         return Response(
#             {'error': 'Sender or recipient user does not exist.'},
#             status=404
#         )

#     # Fetch messages exchanged between the sender and recipient
#     messages = Message.objects.filter(
#         (Q(sender=sender) & Q(recipient=recipient)) |
#         (Q(sender=recipient) & Q(recipient=sender))
#     ).order_by('timestamp')

#     # Serialize the message data
#     data = [
#         {
#             'id': msg.id,
#             'sender': msg.sender.email,
#             'recipient': msg.recipient.email if msg.recipient else None,
#             'content': msg.content,
#             'timestamp': msg.timestamp.isoformat(),
#         }
#         for msg in messages
#     ]

#     return Response(data, status=200)


# # @permission_classes([IsAuthenticated])
# # def chat_history(request, username):
# #     other_user = get_object_or_404(User, username=username)
# #     print(f"Other User: {other_user.username}")
# #     print(f"Request User: {request.headers.get('Authorization')}")
# #     print()
# #     # Get all messages exchanged between the two users
# #     messages = Message.objects.filter(
# #         (Q(sender=request.user) & Q(recipient=other_user)) |
# #         (Q(sender=other_user) & Q(recipient=request.user))
# #     ).order_by('timestamp')

# #     data = [
# #         {
# #             'id': msg.id,
# #             'sender': msg.sender.username,
# #             'recipient': msg.recipient.username if msg.recipient else None,
# #             'content': msg.content,
# #             'timestamp': msg.timestamp,
# #         }
# #         for msg in messages
# #     ]
# #     print("fetched data", data)
# #     return JsonResponse(data, safe=False)




# def get_chat_history(request, user1, user2):
#     client = MongoClient('mongodb://localhost:27017/')
#     db = client['chat_app']
#     collection = db['Message']

#     # Retrieve messages between user1 and user2
#     messages = collection.find({
#         "$or": [
#             {"sender": user1, "receiver": user2},
#             {"sender": user2, "receiver": user1}
#         ]
#     }).sort("timestamp", 1)

#     # Format the messages as a list
#     message_list = []
#     for message in messages:
#         message_list.append({
#             "sender": message['sender'],
#             "receiver": message['receiver'],
#             "message": message['message'],
#             "timestamp": message['timestamp'],
#             "is_read": message.get('is_read', False)
#         })

#     return JsonResponse(message_list, safe=False)
