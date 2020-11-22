from rest_framework import serializers
from transfers.models import Transfer
from users.serializers import ContactSerializer


class TransferSerializer(serializers.ModelSerializer):
    recipient = ContactSerializer()

    class Meta:
        model = Transfer
        fields = [
            "id",
            "recipient",
            "amount",
            "pending",
        ]
