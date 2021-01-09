from django.db import models
from django.contrib.auth.models import (
    AbstractUser,
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)
from utils.models import BaseModel, BaseModelManager
from transfers.querysets import TransferQuerySet


class Transfer(BaseModel):
    sender_user = models.ForeignKey(
        "users.User",
        blank=False,
        related_name="transfers_sent",
        on_delete=models.CASCADE,
    )
    sender_account = models.ForeignKey(
        "users.Account",
        blank=False,
        on_delete=models.CASCADE,
    )
    recipient_user = models.ForeignKey(
        "users.User",
        blank=True,
        null=True,
        related_name="transfers_received",
        on_delete=models.CASCADE,
    )

    title = models.TextField(blank=False)
    recipient = models.ForeignKey("users.Contact", on_delete=models.CASCADE)
    amount = models.DecimalField(
        max_digits=10, decimal_places=2, blank=False, null=False
    )
    pending = models.BooleanField(default=True)
    date_confirmed = models.DateTimeField(blank=True, null=True, default=None)
    frozen_account_number = models.TextField(blank=True, null=True, default=None)

    objects = BaseModelManager.from_queryset(TransferQuerySet)()
