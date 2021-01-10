import secrets
from django.utils import timezone
from iksde_bank.celery import app as celery
from transfers.models import Transfer, TransferConfirmation, get_private_upload_path
from utils.logging import log, error
from transfers.utils import get_transfer_confirmation_html_content
import pdfkit
from django.core.files import File


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


@celery.task()
def generate_confirmations_task():
    log("Running transfer confirmation generation…")

    for t in Transfer.objects.for_confirmation_generation():
        log("Generating transfer confirmation…", {"pk": t.pk})
        transfer_confirmation = TransferConfirmation.objects.create(transfer=t)
        # path = get_private_upload_path(
        #     transfer_confirmation, f"confirmation_{t.pk}.pdf"
        # )
        html_pdf_content = get_transfer_confirmation_html_content(t)
        tmp_path = "/tmp/" + secrets.token_urlsafe()
        pdfkit.from_string(
            html_pdf_content, tmp_path,
        )
        with open(tmp_path, "rb") as f:
            transfer_confirmation.file.save(f"confirmation_{t.pk}.pdf", File(f))
