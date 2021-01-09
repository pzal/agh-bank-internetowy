from django.shortcuts import get_object_or_404
from rest_framework import serializers
from transfers.models import Transfer
from users.serializers import ContactSerializer, UserSerializer, AccountSerializer
from users.models import Contact


class TransferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transfer
        fields = [
            "id",
            "sender_user",
            "sender_account",
            "recipient",
            "title",
            "amount",
            "frozen_account_number",
            "pending",
        ]
        read_only_fields = ("id", "user")


class FullTransferSerializer(serializers.ModelSerializer):
    recipient = ContactSerializer(required=False)
    sender_user = UserSerializer(required=False)
    sender_account = AccountSerializer(required=False)

    class Meta:
        model = Transfer
        fields = [
            "id",
            "sender_user",
            "sender_account",
            "recipient",
            "title",
            "amount",
            "frozen_account_number",
            "pending",
            "date_created",
            "date_confirmed",
        ]
