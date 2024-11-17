from django.contrib import admin
from django.urls import path, include
from app import views

urlpatterns = [
    path('', views.home, name='home'),
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    #path('api/login/', login_view, name='login'), 
    path('accounts/kakao/', include('providers.kakao.urls')),  
    path('signup/', views.signup_view, name='signup'),  # 회원가입 API
    path('login/', views.login_view, name='login'),      # 로그인 API
    path("student/", views.student, name='student'),
]
 