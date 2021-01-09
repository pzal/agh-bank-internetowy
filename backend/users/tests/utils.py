import factory
from django.contrib.auth.hashers import make_password
from users.models import User, Contact


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    email = factory.Faker("email")
    password = factory.LazyFunction(lambda: make_password("test"))


class ContactFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Contact

    user = factory.SubFactory(UserFactory)

    name = factory.Faker("first_name")
    account_number = factory.Faker("iban")
