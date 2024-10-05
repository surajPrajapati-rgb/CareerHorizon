from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Profile
from .serializers import ProfileSerializer

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
    except Profile.DoesNotExist:
        return Response(status=404)
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)
