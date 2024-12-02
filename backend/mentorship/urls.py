from django.contrib import admin
from django.urls import path,include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

# import views
from .views import MentorViewSet,MentorCategoryView,filter_mentors_by_category,allMentor,get_mentor_by_id

router = routers.DefaultRouter()
router.register("mentor",MentorViewSet,basename="mentor")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('mentor/', MentorViewSet.as_view({'get': 'list'}), name='mentor-detail'),
    path('mentors/<int:mentor_id>/', get_mentor_by_id, name='get_mentor_by_id'),
    path('categories/', MentorCategoryView.as_view(), name='mentor-categories'),
    path('filter_mentors/<int:category_id>/', filter_mentors_by_category, name='filter_mentors_by_category'),
    path('all/', allMentor, name='allMentor'),
]
