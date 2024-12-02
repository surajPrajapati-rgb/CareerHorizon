from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as django_login, logout as django_logout
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response


@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

    # Create the user with hashed password
    user = User.objects.create_user(username=username, password=password)
    
    return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST'])
def login(request):
    if request.method == 'GET':
        # Handle GET login (query parameters)
        email = request.query_params.get('email')
        password = request.query_params.get('password')
    elif request.method == 'POST':
        # Handle POST login (JSON body)
        email = request.data.get('email')
        password = request.data.get('password')
    else:
        return Response({"error": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    if not email or not password:
        return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=email, password=password)
    if user is not None:
        django_login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"message": "Login successful", "token": token.key}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


# @api_view(['POST'])
# def login(request):
#     email = request.data.get('email')
#     password = request.data.get('password')

#     user = authenticate(request, username=email, password=password)
#     if user is not None:
#         django_login(request, user)
#         # Optionally, create/retrieve token if using TokenAuthentication
#         token, _ = Token.objects.get_or_create(user=user)
#         return Response({"message": "Login successful", "token": token.key}, status=status.HTTP_200_OK)
#     else:
#         return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def logout(request):
    if request.user.is_authenticated:
        # Optionally, if using TokenAuthentication, delete the token
        Token.objects.filter(user=request.user).delete()
        django_logout(request)
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Not logged in"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def signup_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    name = request.data.get('name')

    if not email or not password or not name:
        return Response({'error': 'Email, password, and name are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=email).exists():
        return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    # Create new user
    user = User.objects.create(
        username=email,
        email=email,
        password=make_password(password),
        first_name=name
    )

    # Generate or retrieve the token
    token, _ = Token.objects.get_or_create(user=user)

    return Response({'token': token.key}, status=status.HTTP_201_CREATED)


class CurrentUserView(APIView):
    def get(self, request, user):
        
        sender_email = request.query_params.get('sender')

        if not sender_email:
            return Response({'error': 'Sender email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            
            user = User.objects.get(email=sender_email)
            return Response({
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_admin': user.is_staff, 
            })
        except User.DoesNotExist:
            return Response({'error': 'User with this email does not exist.'}, status=status.HTTP_404_NOT_FOUND)