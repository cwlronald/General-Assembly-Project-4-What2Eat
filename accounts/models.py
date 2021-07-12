from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
import uuid

# Create your models here.

class User(AbstractUser):
    id=models.UUIDField(
        primary_key=True,
        editable=False,
        default=uuid.uuid4
    )
    achievements=ArrayField()