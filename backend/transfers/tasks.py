from django.utils import timezone
from iksde_bank.celery import app as celery
from transfers.models import Transfer
from utils.logging import log, error


@celery.task()
def settle_transfers_task():
    log("Running transfer settling…")

    for t in Transfer.objects.for_settling():
        # TODO implement, assign recipient_user
        log("Stub transfer settling", {"pk": t.pk})
        t.pending = False
        t.frozen_account_number = t.recipient.account_number
        t.date_confirmed = timezone.now()
        t.save()
