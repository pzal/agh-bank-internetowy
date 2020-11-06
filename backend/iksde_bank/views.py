from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import (
    authentication_classes,
    permission_classes,
    api_view,
)


class DRFAuthenticatedGraphQLView(GraphQLView):
    @classmethod
    @csrf_exempt
    def as_view(cls, *args, **kwargs):
        view = super(DRFAuthenticatedGraphQLView, cls).as_view(*args, **kwargs)
        view = permission_classes((IsAuthenticated,))(view)
        view = authentication_classes((TokenAuthentication,))(view)
        view = api_view(["POST"])(view)
        return view
