import factory
from tqdm import tqdm
from django.core.management.base import BaseCommand, CommandError
from users.models import User
from users.tests.utils import ContactFactory


class Command(BaseCommand):
    def handle(self, *args, **options):
        # Does admin already exist?
        if not User.objects.filter(email="admin@example.com").exists():
            User.objects.create_superuser(
                email="admin@example.com",
                # first_name="Admin",
                # last_name="Admin",
                password="secret",
            )

        ContactFactory.create_batch(10)