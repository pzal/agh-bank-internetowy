import factory
from django.contrib.auth.hashers import make_password
from users.models import User


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    email = factory.Faker("email")
    password = factory.LazyFunction(lambda: make_password("test"))
