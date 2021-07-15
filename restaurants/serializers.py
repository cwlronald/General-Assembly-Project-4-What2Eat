from rest_framework import serializers
from restaurants.models import *

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model=Restaurants
        fields='__all__'


class RestaurantStatsSerializer(serializers.ModelSerializer):
    restaurant_name=serializers.SerializerMethodField()
    def get_restaurant_name(self,obj):
        return obj.restaurant.name  
    class Meta:
        model=RestaurantStats
        fields='__all__'

