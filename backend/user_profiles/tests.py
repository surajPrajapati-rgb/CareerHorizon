from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import Profile
from django.urls import reverse

class ProfileAPITests(APITestCase):

    def setUp(self):
        # Create a test user for authentication
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        
        # Obtain a token for the test user (assuming you're using token authentication)
        self.token, created = Token.objects.get_or_create(user=self.user)
        
        # Set up authentication for the client
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        
        # Create some initial profiles
        self.profile1 = Profile.objects.create(
            user_id=123123,
            name="John Doe",
            email="john.doe@example.com",
            password_hash="password123",
            user_type="student"
        )
        self.profile2 = Profile.objects.create(
            user_id=123124,
            name="Jane Smith",
            email="jane.smith@example.com",
            password_hash="password123",
            user_type="professional"
        )

    def test_get_profiles(self):
        """
        Test listing all profiles.
        """
        url = reverse('profile-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_get_single_profile(self):
        """
        Test retrieving a single profile using user_id.
        """
        url = reverse('profile-detail', kwargs={'user_id': self.profile1.user_id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.profile1.name)

    def test_create_profile(self):
        """
        Test creating a new profile.
        """
        url = reverse('profile-list')
        data = {
            'user_id': 123125,
            'name': 'New User',
            'email': 'new.user@example.com',
            'password_hash': 'password123',
            'user_type': 'student'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Profile.objects.count(), 3)

    def test_update_profile(self):
        """
        Test updating an existing profile.
        """
        url = reverse('profile-detail', kwargs={'user_id': self.profile1.user_id})
        data = {
            'name': 'John Updated',
            'email': self.profile1.email,
            'password_hash': 'newpassword123',
            'user_type': self.profile1.user_type
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.profile1.refresh_from_db()
        self.assertEqual(self.profile1.name, 'John Updated')

    def test_delete_profile(self):
        """
        Test deleting a profile.
        """
        url = reverse('profile-detail', kwargs={'user_id': self.profile1.user_id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Profile.objects.count(), 1)
