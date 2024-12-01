from django.contrib import admin
from django.urls import path,include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

# import views
from .views import MentorViewSet,MentorCategoryView,filter_mentors_by_category

router = routers.DefaultRouter()
router.register("mentor",MentorViewSet,basename="mentor")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('mentor/<int:mentor_id>/', MentorViewSet.as_view({'get': 'list'}), name='mentor-detail'),
    path('categories/', MentorCategoryView.as_view(), name='mentor-categories'),
    path('filter_mentors/<int:category_id>/', filter_mentors_by_category, name='filter_mentors_by_category'),
]
