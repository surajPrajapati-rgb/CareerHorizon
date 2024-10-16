from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Profile
from .serializers import ProfileSerializer
from .serializers import AllProfileDetailsSerializer

@api_view(['GET'])
def profile_list(request):
    """
    Return a list of all profiles.
    """
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def profile_detail(request, user_id):
    """
    Return a single profile based on user_id.
    """
    try:
        profile = Profile.objects.get(user_id=user_id)
        # print(profile)
    except Profile.DoesNotExist:
        return Response(status=404)
    serializer = ProfileSerializer(profile)
    print(serializer.data)
    return Response(serializer.data)

@api_view(['GET'])
def all_profile_details(request, user_id):
    """
    Return a single profile with combined data from all related models based on user_id.
    """
    try:
        profile = Profile.objects.select_related(
            'social_links', 'professional_details', 'student_details'
        ).get(user_id=user_id)
    except Profile.DoesNotExist:
        return Response(status=404)
    
    serializer = AllProfileDetailsSerializer(profile)
    return Response(serializer.data)

@api_view(['POST'])
def get_profile_by_email(request):
    email = request.data.get('email')
    try:
        # Get the user_id directly from the profile by email
        user_id = Profile.objects.filter(email=email).values_list('user_id', flat=True).get()
        print("user_id",user_id)

        profile = Profile.objects.select_related(
            'social_links', 'professional_details', 'student_details'
        ).get(user_id=user_id)
    except Profile.DoesNotExist:
        return Response(status=404)
    
    serializer = AllProfileDetailsSerializer(profile)
    return Response(serializer.data)
        