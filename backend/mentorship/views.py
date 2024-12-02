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
    
    # def list(self,request):   
    #     mentor = Mentor.objects.all()
    #     serializer = MentorSerializer(mentor,many = True,context = {"request":request})
    #     response_dict = {"error":False,"message":"All mentor List data","data":serializer.data}
    #     return Response(response_dict)
    
    def list(self, request):
        # Fetch all mentors
        mentors = Mentor.objects.all()

        # Serialize the mentor data
        # Make sure to include the required fields in the serializer
        serializer = MentorSerializer(mentors, many=True, context={"request": request})

        # Prepare the response data in the desired format
        response_data = {
            "error": False,
            "message": "All mentor list data",
            "data": [
                {
                    "mentor_id": mentor.id,
                    "mentor_image_url": mentor.mentor_image_url,
                    "mentor_name": mentor.mentor_name,
                    "experience_years": mentor.experience_years,
                    "education": mentor.education,
                    "bio": mentor.bio,
                    "hourly_rate": mentor.hourly_rate,
                    "linkedin_url": mentor.linkedin_url
                }
                for mentor in mentors
            ]
        }

        # Return the response with the data
        return Response(response_data)


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
        # Fetch mentors associated with the given category_id
        mentors = Mentor.objects.filter(categories_id=category_id)
        if not mentors.exists():
            return Response({"message": "No mentors found for the given category."}, status=status.HTTP_404_NOT_FOUND)
        
        
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
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
@api_view(['GET'])
def allMentor(request):
    # Fetch all mentors
    mentors = Mentor.objects.all()

    # Serialize the mentor data
    # Make sure to include the required fields in the serializer
    serializer = MentorSerializer(mentors, many=True, context={"request": request})

    # Prepare the response data in the desired format
    response_data = {
        "error": False,
        "message": "All mentor list data",
        "mentors": [
            {
                "mentor_id": mentor.mentor_id,
                "mentor_image_url": mentor.mentor_image_url,
                "mentor_name": mentor.mentor_name,
                "experience_years": mentor.experience_years,
                "education": mentor.education,
                "bio": mentor.bio,
                "hourly_rate": mentor.hourly_rate,
                "linkedin_url": mentor.linkedin_url
            }
            for mentor in mentors
        ]
    }
        
    # Return the response with the data
    return Response(response_data)


@api_view(['GET'])
def get_mentor_by_id(request, mentor_id):
    try:
        # Fetch the mentor object based on mentor_id
        mentor = Mentor.objects.filter(mentor_id=mentor_id).first()

        # If no mentor is found, return a 404 response
        if not mentor:
            return Response(
                {"error": True, "message": "Mentor not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Serialize the mentor data
        mentor_data = {
            "mentor_id": mentor.mentor_id,
            "mentor_name": mentor.mentor_name,
            "mentor_image_url": mentor.mentor_image_url,
            "bio": mentor.bio,
            "experience_years": mentor.experience_years,
            "hourly_rate": str(mentor.hourly_rate),
            "linkedin_url": mentor.linkedin_url,
            "education": mentor.education,
        }

        # Return the response with the mentor data
        return Response(
            {"error": False, "message": "Mentor details fetched successfully.", "mentor": mentor_data},
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        # Handle any unexpected errors
        return Response(
            {"error": True, "message": "An error occurred.", "details": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    