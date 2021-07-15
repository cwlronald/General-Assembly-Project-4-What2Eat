from django.http.response import JsonResponse
from accounts.serializers import UserDataSerializer
from accounts.views import user_data
from django.shortcuts import render
import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from accounts.models import User
from restaurants.models import *
from restaurants.serializers import *
import ast
from rest_framework import status



import os
import random
import googlemaps
# Create your views here.

@api_view(['GET','POST'])
def restaurants_index(request):
    print('mapapi')
    
    if request.method=='POST':
        input=request.data
        print(input)
        coordinates = input['location']
        radius=500
        type='restaurant'
        
        keyword=input['genre']

        if '$' in input['price']:
            maxprice=len(str(input['price']))
        else:
            maxprice=2
            

        googleMapsApiKey= 'AIzaSyAbE5oW_KVEDundMDGXDUe94Fz5xwqqf0s'
        URL = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={coordinates['lat']},{coordinates['lng']}&radius={radius}&maxprice={maxprice}&type={type}&keyword={keyword}&key={googleMapsApiKey}"
        print(URL)
        results = requests.get(URL).json()['results']
        
        
        # results=[{'business_status': 'OPERATIONAL', 'geometry': {'location': {'lat': 1.3576834, 'lng': 103.7605786}, 'viewport': {'northeast': {'lat': 1.359075279892722, 'lng': 103.7618871798927}, 'southwest': {'lat': 1.356375620107278, 'lng': 103.7591875201073}}}, 'icon': 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png', 'name': 'Cacio e Pepe Italian Restaurant', 'opening_hours': {'open_now': False}, 'photos': [{'height': 3024, 'html_attributions': ['<a href="https://maps.google.com/maps/contrib/115514293086313941517">Chloe Chee</a>'], 'photo_reference': 'Aap_uECUE625A3LSOcS9Rthe3NQAFqsGodpITrT3XOMTfHfXlp9MG6GdGnh68J39Gonu34dwMMBONMSnAHv-3TkW7u9aYItypPrhfeWvtqT7ytJWa3rVRc5wC1CjtGM37Jwpnt72pYYSBOXzJheZZzW3uzVbTY578MPrYMSJ9yt2G5sLSAEy', 'width': 4032}], 'place_id': 'ChIJvWnM-E4Q2jERrcEc1xul0NA', 'plus_code': {'compound_code': '9Q56+36 Singapore', 'global_code': '6PH59Q56+36'}, 'price_level': 3, 'rating': 4.3, 'reference': 'ChIJvWnM-E4Q2jERrcEc1xul0NA', 'scope': 'GOOGLE', 'types': ['restaurant', 'food', 'point_of_interest', 'establishment'], 'user_ratings_total': 306, 'vicinity': '3 Chu Lin Rd, Singapore'}, {'business_status': 'OPERATIONAL', 'geometry': {'location': {'lat': 1.3629411, 'lng': 103.7641958}, 'viewport': {'northeast': {'lat': 1.364271829892722, 'lng': 103.7655717298927}, 'southwest': {'lat': 1.361572170107278, 'lng': 103.7628720701073}}}, 'icon': 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png', 'name': 'iO Italian Osteria Singapore', 'opening_hours': {'open_now': False}, 'photos': [{'height': 3000, 'html_attributions': ['<a href="https://maps.google.com/maps/contrib/110859237828072317261">Tzer Chew Goh</a>'], 'photo_reference': 'Aap_uECP8qFlKT61QILHhPXD869NgfNVMJ0zeDrB6YM0z4uyC8zvG2j073wbYhJZHYjsV92V1PFb2V-8iaIxFw2noQpL05jNoHSmx6cEDDXEJh5OuqlZBpdE31IBlUqobMFYbmA73T6htrgNUkx62hH3mDr0qzCEcX9hj6L7sOIAM29yx70A', 'width': 4000}], 'place_id': 'ChIJjYlQqlMQ2jERNTV5U98WYMY', 'plus_code': {'compound_code': '9Q77+5M Singapore', 'global_code': '6PH59Q77+5M'}, 'price_level': 2, 'rating': 4.5, 'reference': 'ChIJjYlQqlMQ2jERNTV5U98WYMY', 'scope': 'GOOGLE', 'types': ['restaurant', 'food', 'point_of_interest', 'establishment'], 'user_ratings_total': 1810, 'vicinity': '4 Hillview Rise, 02-01, Singapore'}, {'business_status': 'OPERATIONAL', 'geometry': {'location': {'lat': 1.3581146, 'lng': 103.7678419}, 'viewport': {'northeast': {'lat': 1.359418829892722, 'lng': 103.7691519298927}, 'southwest': {'lat': 1.356719170107278, 'lng': 103.7664522701073}}}, 'icon': 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png', 'name': 'Acqua e Farina Pte Ltd', 'opening_hours': {'open_now': False}, 'photos': [{'height': 3456, 'html_attributions': ['<a href="https://maps.google.com/maps/contrib/111245966110820786937">Alex Chin</a>'], 'photo_reference': 'Aap_uEBC6g3ssYPZcSBSnkGERHNKIM1FfsDiUk_mrzaeyFc4s9oQLgEg_AQsOFDyRGC0n7puQAg_P5L_9kMlkXDC44lK1kQ05gzwMpnbyF0xXjtT51YhXw0iOs_t4maj14c2mgCPk37EWv4OonXQATvvP0OrOMKuWp5fZsk9-qCB7uRd9Y4v', 'width': 4608}], 'place_id': 'ChIJVzhOFlEQ2jER3n2PjmRDbbk', 'plus_code': {'compound_code': '9Q59+64 Singapore', 'global_code': '6PH59Q59+64'}, 'price_level': 2, 'rating': 4.5, 'reference': 'ChIJVzhOFlEQ2jER3n2PjmRDbbk', 'scope': 'GOOGLE', 'types': ['restaurant', 'food', 'point_of_interest', 'establishment'], 'user_ratings_total': 256, 'vicinity': '400 Upper Bukit Timah Rd, Singapore'}] 

        if results: 
            results=random.choice(results)
            try:
                result_stats = RestaurantStats.objects.get(restaurant_id=results['place_id'],user_id=input['user_id'])
                results['favorite']=result_stats.favorite
                results['visits']=result_stats.visits
            except:
                results['favorite']=False
                results['visits']=0
            print(results)
            return Response(results)
        else:
            return Response({'message':'no restaurants!'})
    


@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def set_restaurant_favorite(request):
    try: 
        data_str=request.body.decode('utf-8')
        data=ast.literal_eval(data_str)
        restaurant_data=data['restaurant_details']
        restaurant, created = Restaurants.objects.update_or_create(
            place_id=restaurant_data['place_id'],
            lat=restaurant_data['lat'],
            lng=restaurant_data['lng'],
            name=restaurant_data['name'],
            vicitiny=restaurant_data['vicitiny']
        )
        restaurantStats, created = RestaurantStats.objects.update_or_create(
            restaurant_id=data['restaurant_id'],
            user_id=data['user_id'],
        )
        restaurantStats.favorite = not restaurantStats.favorite
        restaurantStats.save()
        
        return Response({'message','favorite toggle successful'}, status=status.HTTP_200_OK)
    except:
        return Response({"message" : "Favorites toggle fail"},  status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def visit_restaurant(request):
    try: 
        data_str=request.body.decode('utf-8')
        data=ast.literal_eval(data_str)
        restaurant_data=data['restaurant_details']
        restaurant, created = Restaurants.objects.update_or_create(
            place_id=restaurant_data['place_id'],
            lat=restaurant_data['lat'],
            lng=restaurant_data['lng'],
            name=restaurant_data['name'],
            vicitiny=restaurant_data['vicitiny']
        )
        restaurantStats, created = RestaurantStats.objects.update_or_create(
            restaurant_id=data['restaurant_id'],
            user_id=data['user_id'],
        )
        restaurantStats.visits +=1
        restaurantStats.save()
        
        return Response({'message','add successful'}, status=status.HTTP_200_OK)
    except:
        return Response({"message" : "add fail"},  status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def reduce_visit_restaurant(request):
    try: 
        data_str=request.body.decode('utf-8')
        data=ast.literal_eval(data_str)
        restaurant_data=data['restaurant_details']
        restaurant, created = Restaurants.objects.update_or_create(
            place_id=restaurant_data['place_id'],
            lat=restaurant_data['lat'],
            lng=restaurant_data['lng'],
            name=restaurant_data['name'],
            vicitiny=restaurant_data['vicitiny']
        )
        restaurantStats, created = RestaurantStats.objects.update_or_create(
            restaurant_id=data['restaurant_id'],
            user_id=data['user_id'],
        )
        if restaurantStats.visits >0:
            restaurantStats.visits -=1

        restaurantStats.save()
        
        return Response({'message','minus successful'}, status=status.HTTP_200_OK)
    except:
        return Response({"message" : "minus fail"},  status=status.HTTP_400_BAD_REQUEST)




