from rest_framework import serializers
from users.models import User, Contact
from users.actions import validate_contact_creation_by_user, validate_contact_update_by_user



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

    def create(self, validated_data):
        validate_contact_creation_by_user(user=self.context['request'].user, validated_data=validated_data)
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        validate_contact_update_by_user(user=self.context['request'].user, instance=instance, validated_data=validated_data)
        return super().update(instance, validated_data)
