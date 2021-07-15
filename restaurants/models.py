from django.contrib.auth.models import User
from django.db import models
from accounts.models import User
import uuid

# Create your models here.
class Restaurants(models.Model):
    place_id = models.CharField(
        primary_key=True,
        max_length=200
    )
    lat=models.FloatField()
    lng=models.FloatField()
    name=models.CharField(max_length=200)
    vicitiny=models.CharField(max_length=200)
    def __str__(self):
        return self.name

class RestaurantStats(models.Model):
    id=models.UUIDField(
        primary_key=True,
        editable=False,
        default=uuid.uuid4
    )
    restaurant=models.ForeignKey(
        Restaurants, 
        on_delete=models.CASCADE,
        related_name='restaurant_id')
    user=models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='user_id')
    favorite=models.BooleanField(default=False)
    visits=models.IntegerField(default=0)

    def __str__(self):
        return self.restaurant.name


    def serialize(self):
        return{
            'username': self.user.username,
            'email':self.user.email,
            'restaurant':self.restaurant.name,
            'place_id':self.restaurant.place_id,
            'lat':self.lat,
            'lng':self.lng,
            'favorite':self.favorite,
            'visits':self.visits
        }
    