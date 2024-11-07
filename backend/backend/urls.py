from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    #path('api/login/', login_view, name='login'), 
    path('accounts/kakao/', include('providers.kakao.urls')),  
]
