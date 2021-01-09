from iksde_bank.celery import app as celery
from transfers.models import Transfer
from utils.logging import log, error

@celery.task()
def settle_transfers_task():
    log("Running transfer settling…")
    
    for t in Transfer.objects.filter(pending=True):
        # TODO implement
        log('Stub transfer settling', {"pk": t.pk})
        t.pending = False
        t.save()
