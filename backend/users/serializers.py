from rest_framework import serializers
from users.models import User, Contact


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
        ]

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = [
            "id",
            "name",
            "user",
            "account_number",
        ]
        read_only_fields = ("user", )
