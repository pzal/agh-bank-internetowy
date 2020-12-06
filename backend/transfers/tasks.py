from iksde_bank.celery import app as celery
from transfers.models import Transfer

@celery.task()
def settle_transfers_task():
    print("Running transfer settling…")
    
    for t in Transfer.objects.filter(pending=True):
        # TODO implement
        print('Stub transfer settling ', t.pk)
        t.pending = False
        t.save()
