from iksde_bank.celery import app as celery


# TODO remove debug task
@celery.task()
def debug_task():
    print("Running debug task…")
