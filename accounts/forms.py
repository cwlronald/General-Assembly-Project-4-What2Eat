from django.contrib.auth.forms import UserCreationForm
from accounts.models import User


class UserSerializer(UserCreationForm):
    class Meta:
        model=User
        fields=[
            'username',
            'email',
            'password'
        ]