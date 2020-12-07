import random
import factory
from django.contrib.auth.hashers import make_password
from transfers.models import Transfer
from users.tests.utils import ContactFactory, UserFactory


class TransferFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Transfer

    user = factory.SubFactory(UserFactory)
    recipient = factory.SubFactory(ContactFactory)

    amount = factory.LazyAttribute(lambda __: random.randrange(10, 2001))
    pending = False
