import random
import factory
from django.contrib.auth.hashers import make_password
from transfers.models import Transfer
from users.tests.utils import ContactFactory


class TransferFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Transfer

    recipient = factory.SubFactory(ContactFactory)

    amount = factory.LazyAttribute(lambda __: random.randrange(10, 2001))
    pending = False
