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
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)
    
    recipient = models.ForeignKey("users.Contact", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False)
    pending = models.BooleanField(default=True)

    objects = BaseModelManager.from_queryset(TransferQuerySet)()
