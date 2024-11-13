import pytest
import json
from django.urls import reverse
from rest_framework import status
from messaging.models import Message

@pytest.mark.django_db
def test_message_creation(authenticated_client, message):
    # The `authenticated_client` and `message` fixtures are automatically set up
    response = authenticated_client.get('/messaging/sent/')
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]['content'] == 'Test message'

@pytest.mark.django_db
def test_sent_messages(authenticated_client, message, another_user):
    # Ensure the message has a recipient set if your logic requires one.
    message.recipient = another_user
    message.save()

    url = reverse('sent_messages')
    response = authenticated_client.get(url)

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) == 1  # Ensure there is one sent message
    assert data[0]['content'] == 'Test message'

# Test for listing sent messages
@pytest.mark.django_db
def test_sent_messages(authenticated_client, message):
    url = reverse('sent_messages')
    response = authenticated_client.get(url)

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) == 1
    assert data[0]['content'] == 'Test message'

# Test for listing received messages
@pytest.mark.django_db
def test_received_messages(authenticated_client, another_user, message):
    # Log in as the recipient
    authenticated_client.login(username='otheruser', password='password456')
    url = reverse('received_messages')
    response = authenticated_client.get(url)

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) == 1
    assert data[0]['content'] == 'Test message'


@pytest.mark.django_db
def test_message_detail(authenticated_client, message):
    url = reverse('message_detail', args=[message.id])

    # Retrieve the message
    response = authenticated_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.json()['content'] == 'Test message'

    # Update the message
    update_data = {'content': 'Updated content'}
    response = authenticated_client.put(
        url, 
        data=json.dumps(update_data), 
        content_type='application/json'
    )

    print("PUT Response Status Code:", response.status_code)
    print("PUT Response Data:", response.json())

    # Check if the PUT request was successful
    assert response.status_code == status.HTTP_200_OK
    assert response.json()['status'] == 'success'

    # Refresh the message from DB
    message.refresh_from_db()
    assert message.content == 'Updated content'

    # Delete the message
    response = authenticated_client.delete(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.json()['status'] == 'success'
    assert not Message.objects.filter(id=message.id).exists()

