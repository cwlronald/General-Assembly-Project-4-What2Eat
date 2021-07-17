import re
from django.http.response import JsonResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from accounts.serializers import *
from rest_framework import status
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import AuthenticationForm,UserCreationForm
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from restaurants.serializers import *
from django.db.models import Q

# Create your views here.
@api_view(["POST"])
def register_user(request):

    if request.data['password'] != request.data['confirmPassword']:
        return JsonResponse({"password": ["Passwords do not match."]},  status=status.HTTP_400_BAD_REQUEST)
        
    request.data['password']=make_password(request.data['password'])
    
    user = UserSerializer(data=request.data)
    if user.is_valid():
        user.save()
        return Response({"message" : "Registration successful"}, status=status.HTTP_200_OK)
        # refresh = RefreshToken.for_user(user)
        # return Response({"refresh": str(refresh), "access": str(refresh.access_token)})
    else:
        return JsonResponse(user.errors,  status=status.HTTP_400_BAD_REQUEST)


        

@api_view(["POST"])
def login_user(request):
    print(request.data)

    login_form=AuthenticationForm()
    login_form=AuthenticationForm(request,data=request.data)
    if login_form.is_valid():
        username=login_form.cleaned_data['username']
        password=login_form.cleaned_data['password']
        user = authenticate(username=username, password=password)
        
        if user is not None:
            login(request,user)
            refresh = RefreshToken.for_user(user)
            return Response({"refresh": str(refresh), "access": str(refresh.access_token)})
        else:
            return Response(user.errors,  status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse(login_form.errors,  status=status.HTTP_400_BAD_REQUEST)     


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_data(request):

    request_user = request.user

    request_user_serialize = UserDataSerializer(request_user)
    user_profile = request_user_serialize.data

    request_user_id = request_user.id
    user_stats_filter = RestaurantStats.objects.filter(
        Q(user_id=request_user_id),
        Q(visits__gt=0)|
        Q(favorite=True)
    )
    
    
    user_stats_serialize = RestaurantStatsSerializer(user_stats_filter,many=True)
    user_stats = user_stats_serialize.data

    # print(user_profile)
    # print(user_stats)
    print('user data sent')

    return Response({'user_profile':user_profile,'user_stats':user_stats})


def logout_user(request):
    print('logout_user')
    pass

   