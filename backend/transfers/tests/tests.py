from django.test import TestCase
from users.models import User
from users.tests.utils import UserFactory, ContactFactory
from transfers.tests.utils import TransferFactory
from transfers.models import Transfer


class TransferTestCase(TestCase):
    def setUp(self):
        self.user = UserFactory.create()
        self.contact = ContactFactory.create(user=self.user)

    def test_transfer_pending_by_default(self):
        t = Transfer.objects.create(user=self.user, recipient=self.contact, amount=100)
        self.assertTrue(t.pending)


class TransferSettlingTestCase(TestCase):
    def setUp(self):
        self.pending_transfer = TransferFactory.create(pending=True)

    def test_transfer_is_for_settling(self):
        self.assertIn(self.pending_transfer, Transfer.objects.for_settling())
