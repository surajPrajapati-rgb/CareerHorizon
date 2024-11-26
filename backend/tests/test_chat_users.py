import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from messaging.models import Message

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def create_users():
    # Create three test users
    user1 = User.objects.create_user(username='user1', email='user1@example.com', password='password1')
    user2 = User.objects.create_user(username='user2', email='user2@example.com', password='password2')
    user3 = User.objects.create_user(username='user3', email='user3@example.com', password='password3')
    return user1, user2, user3

@pytest.fixture
def create_messages(create_users):
    # Create chat messages between users
    user1, user2, user3 = create_users
    Message.objects.create(sender=user1, recipient=user2, content="Hello, User2!")
    Message.objects.create(sender=user2, recipient=user1, content="Hi, User1!")
    Message.objects.create(sender=user1, recipient=user3, content="Hello, User3!")
    return Message.objects.all()

@pytest.mark.django_db
def test_chat_users(api_client, create_users, create_messages):
    # Arrange: Set up authenticated user
    user1, _, _ = create_users
    api_client.force_authenticate(user=user1)

    # Act: Call the chat_users endpoint
    response = api_client.get('messaging/chat_users/', {'sender': user1.username})

    # Assert: Verify response
    assert response.status_code == 200
    assert len(response.json()) == 2  # user1 has communicated with 2 other users
    usernames = [user['username'] for user in response.json()]
    assert 'user2' in usernames
    assert 'user3' in usernames

@pytest.mark.django_db
def test_chat_users_no_communication(api_client, create_users):
    # Arrange: Set up authenticated user
    _, _, user3 = create_users
    api_client.force_authenticate(user=user3)

    # Act: Call the chat_users endpoint for a user with no communication
    response = api_client.get('messaging/chat_users/', {'sender': user3.username})

    # Assert: Verify response
    assert response.status_code == 200
    assert len(response.json()) == 0  # user3 has not communicated with anyone
