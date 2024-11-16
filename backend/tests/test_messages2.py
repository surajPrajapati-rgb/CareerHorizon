import pytest
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from messaging.models import Message

# Fixtures
@pytest.fixture
def client():
    """Fixture for Django test client."""
    return APIClient()

@pytest.fixture
def create_users():
    """Fixture to create test users."""
    user1 = User.objects.create_user(username='alice', password='password123')
    user2 = User.objects.create_user(username='bob', password='password123')
    return user1, user2

@pytest.fixture
def auth_client(client, create_users):
    """Fixture to log in as a user."""
    user1, _ = create_users
    client.login(username='alice', password='password123')
    return client, user1


# Test cases
@pytest.mark.django_db
def test_create_message(auth_client, create_users):
    """Test creating a new message."""
    client, sender = auth_client
    _, recipient = create_users

    url = reverse('create_message')
    payload = {
        "recipient": recipient.username,
        "content": "Hello Bob!"
    }

    response = client.post(url, payload, format='json')
    assert response.status_code == 201
    assert response.json()['status'] == 'success'

    # Check if message is saved in the database
    message = Message.objects.filter(sender=sender, recipient=recipient).first()
    assert message is not None
    assert message.content == "Hello Bob!"


@pytest.mark.django_db
def test_chat_users(auth_client, create_users):
    """Test retrieving list of users the sender has chatted with."""
    client, sender = auth_client
    _, recipient = create_users

    # Create messages
    Message.objects.create(sender=sender, recipient=recipient, content="Message 1")
    Message.objects.create(sender=recipient, recipient=sender, content="Message 2")

    url = reverse('chat_users')
    response = client.get(url)
    assert response.status_code == 200
    users = response.json()
    assert len(users) == 1
    assert users[0]['username'] == recipient.username


@pytest.mark.django_db
def test_chat_history(auth_client, create_users):
    """Test retrieving chat history with a specific user."""
    client, sender = auth_client
    _, recipient = create_users

    # Create messages between users
    Message.objects.create(sender=sender, recipient=recipient, content="Hi Bob!")
    Message.objects.create(sender=recipient, recipient=sender, content="Hello Alice!")

    url = reverse('chat_history', args=[recipient.username])
    response = client.get(url)
    assert response.status_code == 200
    messages = response.json()
    assert len(messages) == 2
    assert messages[0]['content'] == "Hi Bob!"
    assert messages[1]['content'] == "Hello Alice!"


@pytest.mark.django_db
def test_create_message_with_invalid_user(auth_client):
    """Test creating a message with an invalid recipient."""
    client, _ = auth_client
    url = reverse('create_message')
    payload = {
        "recipient": "nonexistent_user",
        "content": "This should fail"
    }

    response = client.post(url, payload, format='json')
    assert response.status_code == 404
    assert response.json()['status'] == 'error'


@pytest.mark.django_db
def test_create_message_empty_content(auth_client, create_users):
    """Test creating a message with empty content."""
    client, _ = auth_client
    _, recipient = create_users

    url = reverse('create_message')
    payload = {
        "recipient": recipient.username,
        "content": ""
    }

    response = client.post(url, payload, format='json')
    assert response.status_code == 400
    assert response.json()['status'] == 'error'
