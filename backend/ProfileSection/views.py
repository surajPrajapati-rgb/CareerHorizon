from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import Profile
from .serializers import ProfileSerializer

class ProfileView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    
    def get(self, request, *args, **kwargs):
        print("Received GET request to /profile/")
        email = request.query_params.get('email')
        print(f"Received email: {email}")
        if not email:
            return Response({'error': 'Email parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Fetch the profile associated with the email
            profile = Profile.objects.get(user__email=email)
            serializer = ProfileSerializer(profile)
            print(f"Fetched profile: {serializer.data}")
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Profile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
