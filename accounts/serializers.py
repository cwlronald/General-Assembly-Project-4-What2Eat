from rest_framework import serializers
from accounts.models import *
from restaurants.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'


class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        exclude = ('password',)


