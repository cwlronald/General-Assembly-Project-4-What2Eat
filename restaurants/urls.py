from django.urls import path 
from restaurants.views import *

urlpatterns=[
    path('',restaurants_index,name='restaurants_index_page')
]