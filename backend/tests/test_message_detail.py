import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from messaging.models import Message

@pytest.fixture
def api_client():
    return APIClient()

@pytest.mark.django_db
def test_message_detail_get(api_client):
    # Setup: Create users and a message
    sender = User.objects.create_user(username='user1', email='user1@example.com', password='password123')
    recipient = User.objects.create_user(username='user2', email='user2@example.com', password='password123')
    message = Message.objects.create(
        sender=sender,
        recipient=recipient,
        content="Hello, user2!",
        room_name=f"{sender.username}_{recipient.username}"
    )

    # Authenticate sender
    api_client.force_authenticate(user=sender)

    # Test: Fetch message details
    response = api_client.get(f'http://localhost:8000/messaging/message/{message.id}/')
    assert response.status_code == status.HTTP_200_OK

    # Compare the response data without 'timestamp'
    expected_data = {
        'id': message.id,
        'sender': sender.username,
        'recipient': recipient.username,
        'room_name': message.room_name,
        'content': message.content,
    }

    response_data = response.json()
    del response_data['timestamp']  # Remove the timestamp from the API response for comparison

    assert response_data == expected_data


@pytest.mark.django_db
def test_message_detail_update(api_client):
    # Setup: Create users and a message
    sender = User.objects.create_user(username='user1', email='user1@example.com', password='password123')
    recipient = User.objects.create_user(username='user2', email='user2@example.com', password='password123')
    message = Message.objects.create(
        sender=sender,
        recipient=recipient,
        content="Hello, user2!",
        room_name=f"{sender.username}_{recipient.username}"
    )

    # Authenticate sender
    api_client.force_authenticate(user=sender)

    # Test: Update message content
    updated_content = {'content': "Updated message content"}
    response = api_client.put(f'http://localhost:8000/messaging/message/{message.id}/', updated_content, format='json')
    assert response.status_code == status.HTTP_200_OK
    message.refresh_from_db()
    assert message.content == updated_content['content']


@pytest.mark.django_db
def test_message_detail_delete(api_client):
    # Setup: Create users and a message
    sender = User.objects.create_user(username='user1', email='user1@example.com', password='password123')
    recipient = User.objects.create_user(username='user2', email='user2@example.com', password='password123')
    message = Message.objects.create(
        sender=sender,
        recipient=recipient,
        content="Hello, user2!",
        room_name=f"{sender.username}_{recipient.username}"
    )

    # Authenticate sender
    api_client.force_authenticate(user=sender)

    # Test: Delete message
    response = api_client.delete(f'http://localhost:8000/messaging/message/{message.id}/')
    assert response.status_code == status.HTTP_200_OK
    assert not Message.objects.filter(id=message.id).exists()


# @pytest.mark.django_db
# def test_message_detail_unauthorized_access(api_client):
#     # Setup: Create users and a message
#     sender = User.objects.create_user(username='user1', email='user1@example.com', password='password123')
#     recipient = User.objects.create_user(username='user2', email='user2@example.com', password='password123')
#     unauthorized_user = User.objects.create_user(username='unauthorized', email='unauthorized@example.com', password='password123')
#     message = Message.objects.create(
#         sender=sender,
#         recipient=recipient,
#         content="Hello, user2!",
#         room_name=f"{sender.username}_{recipient.username}"
#     )

#     # Authenticate an unauthorized user
#     api_client.force_authenticate(user=unauthorized_user)

#     # Test: Unauthorized user tries to access the message
#     response = api_client.get(f'http://localhost:8000/messaging/message/{message.id}/')
#     assert response.status_code == status.HTTP_403_FORBIDDEN
