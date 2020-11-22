from rest_framework import viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from users.utils import AuthUserSerializer
from users.models import User, Contact
from users.serializers import UserSerializer, ContactSerializer
from transfers.serializers import TransferSerializer
from transfers.models import Transfer



class TransferViewSet(viewsets.ModelViewSet):
    queryset = Transfer.objects.all()
    serializer_class = TransferSerializer

    def get_queryset(self):
        # user = self.request.user
        # users = self.queryset.filter(id=user.id)
        transfers = self.queryset.all()
        return TransferSerializer(instance=transfers, many=True).data

