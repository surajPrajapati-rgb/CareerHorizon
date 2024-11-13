from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse, HttpResponse, HttpResponseForbidden
from django.contrib.auth.decorators import login_required
from .models import Message
from .forms import MessageForm
from django.views.decorators.csrf import csrf_exempt
import json

# Create a message
@csrf_exempt
@login_required
def create_message(request):
    print("Received a POST request to create a message.")
    print("Request body:", request.body)
    if request.method == 'POST':
        data = json.loads(request.body)
        form = MessageForm(data)
        if form.is_valid():
            message = form.save(commit=False)
            message.sender = request.user
            message.save()
            return JsonResponse({'status': 'success', 'message': 'Message sent successfully.'}, status=201)
        else:
            return JsonResponse({'status': 'error', 'errors': form.errors}, status=400)
    return HttpResponse(status=405)

# List all messages sent by the user
@login_required
def sent_messages(request):
    messages = Message.objects.filter(sender=request.user).order_by('-timestamp')
    data = [{'id': msg.id, 'recipient': msg.recipient.username if msg.recipient else None, 'room_name': msg.room_name, 'content': msg.content, 'timestamp': msg.timestamp} for msg in messages]
    return JsonResponse(data, safe=False)

# List all messages received by the user
@login_required
def received_messages(request):
    messages = Message.objects.filter(recipient=request.user).order_by('-timestamp')
    data = [{'id': msg.id, 'sender': msg.sender.username, 'room_name': msg.room_name, 'content': msg.content, 'timestamp': msg.timestamp} for msg in messages]
    return JsonResponse(data, safe=False)

# Retrieve, update, or delete a specific message
@csrf_exempt
@login_required
def message_detail(request, message_id):
    # print(type(message_id))
    message = get_object_or_404(Message, id=message_id)
    # Inside your message_detail view:
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
