from iksde_bank.celery import app as celery
from utils.logging import log, error

# TODO remove debug task
@celery.task()
def debug_task():
    log("Running debug task…")
