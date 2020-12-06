from django.shortcuts import get_object_or_404
from rest_framework import serializers
from transfers.models import Transfer
from users.serializers import ContactSerializer
from users.models import Contact


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

    def create(self, validated_data):
        # This method has be implemented because the POST passes patient as an object (not just the ID).
        contact_id = validated_data.pop("recipient").get("id")
        contact = get_object_or_404(Contact, pk=contact_id)

        return Transfer.objects.create(recipient=contact, **validated_data)