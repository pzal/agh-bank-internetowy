from django.urls import path
from users.views import AuthTokenView, UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"", UserViewSet)

urlpatterns = [path("api-token-auth/", AuthTokenView.as_view()), *router.urls]
