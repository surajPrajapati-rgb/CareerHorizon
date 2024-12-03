from django.test import TestCase
from django.test import TestCase, Client
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.urls import reverse

class UserAuthTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.register_url = reverse('register')
        self.signup_url = reverse('signup')
        self.login_url = reverse('login')
        self.logout_url = reverse('logout')
        self.current_user_url = reverse('current_user')

        self.test_user_email = 'testuser@example.com'
        self.test_user_password = 'password123'
        self.test_user_name = 'Test User'
        
        # Create a test user
        self.user = User.objects.create_user(
            username=self.test_user_email,
            email=self.test_user_email,
            password=self.test_user_password,
            first_name=self.test_user_name
        )
        self.token = Token.objects.create(user=self.user)

    def test_register(self):
        response = self.client.post(self.register_url, {
            'username': 'newuser',
            'password': 'newpassword123'
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn('message', response.json())

    def test_register_existing_user(self):
        response = self.client.post(self.register_url, {
            'username': self.user.username,
            'password': 'newpassword123'
        })
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())

    def test_signup(self):
        response = self.client.post(self.signup_url, {
            'email': 'signupuser@example.com',
            'password': 'signup123',
            'name': 'Signup User'
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn('token', response.json())

    def test_signup_existing_email(self):
        response = self.client.post(self.signup_url, {
            'email': self.test_user_email,
            'password': 'signup123',
            'name': 'Signup User'
        })
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())

    def test_login_valid_credentials(self):
        response = self.client.post(self.login_url, {
            'email': self.test_user_email,
            'password': self.test_user_password
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('token', response.json())

    def test_login_invalid_credentials(self):
        response = self.client.post(self.login_url, {
            'email': self.test_user_email,
            'password': 'wrongpassword'
        })
        self.assertEqual(response.status_code, 401)
        self.assertIn('error', response.json())

    def test_current_user_view_valid_email(self):
        response = self.client.get(self.current_user_url, {'sender': self.test_user_email})
        self.assertEqual(response.status_code, 200)
        self.assertIn('email', response.json())
        self.assertEqual(response.json()['email'], self.test_user_email)

    def test_current_user_view_invalid_email(self):
        response = self.client.get(self.current_user_url, {'sender': 'nonexistent@example.com'})
        self.assertEqual(response.status_code, 404)
        self.assertIn('error', response.json())

    def test_current_user_view_missing_email(self):
        response = self.client.get(self.current_user_url)
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
