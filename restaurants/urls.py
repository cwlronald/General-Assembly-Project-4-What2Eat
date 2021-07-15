from django.urls import path 
from restaurants.views import *

app_name='restaurants'

urlpatterns=[
    path('',restaurants_index,name='restaurants_index_page'),
    path('set_restaurant_favorite/',set_restaurant_favorite,name='set_restaurant_favorite'),
    path('visit_restaurant/',visit_restaurant,name='visit_restaurant'),
    path('reduce_visit_restaurant/',reduce_visit_restaurant,name='reduce_visit_restaurant'),
    
]