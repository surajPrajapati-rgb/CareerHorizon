import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from messaging.models import Message

@pytest.mark.django_db
def test_example():
    assert 1 + 1 == 2

@pytest.fixture
def user():
    return User.objects.create_user(username='testuser', password='password123')

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def authenticated_client(user, api_client):
    api_client.login(username='testuser', password='password123')
    # print(api_client)
    return api_client

@pytest.fixture
def another_user():
    return User.objects.create_user(username='otheruser', password='password456')

@pytest.fixture
def message(user, another_user):
    return Message.objects.create(
        sender=user,
        recipient=another_user,
        content='Test message',
        room_name='test_room'
    )
