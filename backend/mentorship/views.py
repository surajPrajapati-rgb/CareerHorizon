from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Mentor
from .serializers import MentorSerializer
from django.shortcuts import get_object_or_404




# for mentor
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
