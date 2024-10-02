from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as django_login, logout as django_logout
from django.http import JsonResponse

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if username and password:
        user = User.objects.create_user(username=username, password=password)
        return Response({"message": "User registered successfully"})
    else:
        return Response({"error": "Username and password are required"}, status=400)

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)
    if user is not None:
        django_login(request, user)
        return Response({"message": "Login successful"})
    else:
        return Response({"error": "Invalid credentials"}, status=401)

@api_view(['POST'])
def logout(request):
    django_logout(request)
    return Response({"message": "Logged out successfully"})
