from django.urls import path
from accounts.views import *

app_name = "accounts"
urlpatterns = [
    path('register/', register_user, name="register_view"),
    path('login/', login_user, name="login_view"),
    path('user/', user_data, name="user_view"),
    path('logout/', logout_user, name="logout"),
    # path('',show_user,name='show_user')
] 