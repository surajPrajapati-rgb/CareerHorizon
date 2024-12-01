from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Mentor,MentorCategory
from .serializers import MentorSerializer,MentorCategorySerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.http import JsonResponse





############################## API related to mentor ###################################

class MentorViewSet(viewsets.ModelViewSet):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer
    # permission_classes = [IsAuthenticated] 
    
    def retrieve(self, request, pk=None):
        mentor = get_object_or_404(Mentor, pk=pk)
        serializer = self.get_serializer(mentor)
        return Response(serializer.data)
    
    def list(self,request):   
        mentor = Mentor.objects.all()
        serializer = MentorSerializer(mentor,many = True,context = {"request":request})
        response_dict = {"error":False,"message":"All mentor List data","data":serializer.data}
        return Response(response_dict)

    def create(self, request):
        try:
            # Log the incoming request data
            print("POST request received:", request.data) 
            
            # Use the serializer to validate and create the mentor instance
            serializer = MentorSerializer(data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)  # This will raise an error if validation fails
            
            # Save the mentor instance to the database
            serializer.save()
            
            # Prepare a success response
            dict_response = {"error": False, "message": "Mentor data saved successfully"}
        except Exception as e:
            # Log the error to the console for debugging
            print("Error occurred:", str(e))
            # If serializer is invalid, include specific error messages
            if hasattr(serializer, 'errors'):
                print("Validation errors:", serializer.errors)
                dict_response = {"error": True, "message": "Error occurred during saving data", "details": serializer.errors}
            else:
                dict_response = {"error": True, "message": "Error occurred during saving data"}
              
        return Response(dict_response)
       
menotr_create = MentorViewSet.as_view({"post": "create"})
mentor_list = MentorViewSet.as_view({"get":"list"})



####################### API related to categories ################################

class MentorCategoryView(APIView):
    def get(self, request):
        categories = MentorCategory.objects.all()
        serializer = MentorCategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

@api_view(['GET'])
def filter_mentors_by_category(request, category_id):
    try:
        # Get the category by ID
        category = MentorCategory.objects.get(mentor_category_id=category_id)
        
        # Get all mentors linked to this category
        mentors = category.mentors.all()

        # Serialize the mentor data
        mentor_data = [
            {
                "mentor_id": mentor.mentor_id,
                "mentor_name": mentor.mentor_name,
                "mentor_image_url": mentor.mentor_image_url,
                "bio": mentor.bio,
                "experience_years": mentor.experience_years,
                "hourly_rate": str(mentor.hourly_rate),
                "linkedin_url": mentor.linkedin_url,
                "education": mentor.education,
            }
            for mentor in mentors
        ]

        return JsonResponse({"mentors": mentor_data}, safe=False)
    except MentorCategory.DoesNotExist:
        return JsonResponse({"error": "Invalid category_id"}, status=404)
