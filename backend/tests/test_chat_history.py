import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from messaging.models import Message

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def create_users():
    # Create two test users
    user1 = User.objects.create_user(username='user1', email='user1@example.com', password='password1')
    user2 = User.objects.create_user(username='user2', email='user2@example.com', password='password2')
    return user1, user2

@pytest.fixture
def create_messages(create_users):
    # Create chat messages between the two users
    user1, user2 = create_users
    Message.objects.create(sender=user1, recipient=user2, content="Hello, User2!", room_name="user1_user2")
    Message.objects.create(sender=user2, recipient=user1, content="Hi, User1!", room_name="user1_user2")
    return Message.objects.all()

@pytest.mark.django_db
def test_chat_history(api_client, create_users, create_messages):
    # Arrange: Set up authenticated user and test data
    user1, user2 = create_users
    api_client.force_authenticate(user=user1)

    # Act: Call the chat_history endpoint
    response = api_client.get(f'/messaging/chat/{user2.username}/', {'sender': user1.username})

    # Assert: Verify response
    assert response.status_code == 200
    assert len(response.data) == 2  # Expect two messages
    assert response.data[0]['content'] == "Hello, User2!"
    assert response.data[1]['content'] == "Hi, User1!"
    assert response.data[0]['sender'] == user1.username
    assert response.data[0]['recipient'] == user2.username
    assert response.data[1]['sender'] == user2.username
    assert response.data[1]['recipient'] == user1.username

@pytest.mark.django_db
def test_chat_history_user_not_found(api_client, create_users):
    # Arrange: Set up authenticated user
    user1, _ = create_users
    api_client.force_authenticate(user=user1)

    # Act: Call the chat_history endpoint with a non-existent user
    response = api_client.get('/messaging/chat/nonexistent_user/', {'sender': user1.username})

    # Assert: Verify 404 response
    assert response.status_code == 404
    assert response.data['status'] == 'error'
    assert response.data['message'] == 'User not found.'

@pytest.mark.django_db
def test_chat_history_missing_sender(api_client, create_users):
    # Arrange: Set up authenticated user
    _, user2 = create_users
    api_client.force_authenticate(user=user2)

    # Act: Call the chat_history endpoint without a sender query parameter
    response = api_client.get(f'/messaging/chat/{user2.username}/')

    # Assert: Verify 400 response
    assert response.status_code == 400
    assert response.data['detail'] == 'Sender email is required.'
