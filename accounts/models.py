from django.db import models
from django.contrib.auth.models import AbstractUser
# from restaurants.models import *
import uuid

# Create your models here.

class User(AbstractUser):
    id=models.UUIDField(
        primary_key=True,
        editable=False,
        default=uuid.uuid4
    )



    