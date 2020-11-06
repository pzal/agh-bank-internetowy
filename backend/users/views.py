from rest_framework import viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from users.utils import AuthUserSerializer
from users.models import User
from users.serializers import UserSerializer


class AuthTokenView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = AuthUserSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)

        return Response({"token": token.key, "user_id": user.pk, "email": user.email})


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.user
        users = self.queryset.filter(id=user.id)
        return UserSerializer(instance=users, many=True).data

