from django.shortcuts import get_object_or_404
from rest_framework import serializers
from transfers.models import Transfer
from users.serializers import ContactSerializer, UserSerializer
from users.models import Contact


class TransferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transfer
        fields = [
            "id",
            "user",
            "recipient",
            "amount",
            "pending",
        ]
        read_only_fields = ("id", "user")


class FullTransferSerializer(serializers.ModelSerializer):
    recipient = ContactSerializer(required=False)
    user = UserSerializer(required=False)

    class Meta:
        model = Transfer
        fields = [
            "id",
            "user",
            "recipient",
            "amount",
            "pending",
        ]
