from django.db import models

class TransferQuerySet(models.QuerySet):
    def for_user(self, user):
        return self.filter(user=user)