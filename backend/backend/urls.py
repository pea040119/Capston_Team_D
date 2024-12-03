from django.contrib import admin
from django.urls import path, include
from app import views 

urlpatterns = [
    # path('', views.home, name='home'),
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('accounts/kakao/', include('providers.kakao.urls')),  
    path('signup/', views.signup_view, name='signup'),  # 회원가입 API
    path('login/', views.login_view, name='login'),      # 로그인 API
    # path("student/", views.student, name='student'),
    path("tutor/class_register", views.class_create, name='class_register'),
    path('tutor/student_list/<int:tutor_id>/', views.get_student_list, name='student_list'),


    path("tutor/class_time_set", views.class_set_time, name='class_time_set'),
    path("tutor/class_student_set", views.class_set_student, name='class_student_set'),
    # path("tutor/week_schedule", views.week_schedule, name='week_schedule'),
    path("tutor/daily", views.daily_create, name='daily'),
    path("tutor/week_schedule", views.week_schedule, name='week_schedule'),
    path("api/add_daily/<int:tutor_id>/", views.add_daily, name='get_daily'),
    # path("api/add_calendar/<int:tutor_id>/", views.add_calendar, name='add_calendar'),
    path("tutor/add_homework/<int:tutor_id>/", views.add_homework, name='add_homework'),
    path("tutor/add_supplement/<int:tutor_id>/", views.add_supplement, name='add_supplement'),
    path('tutor/add_progress/<int:tutor_id>/', views.add_progress, name='add_progress'),
    path("tutor/delete_progress/<int:tutor_id>/", views.delete_progress, name='delete_progress'),
    path("tutor/delete_homework/<int:tutor_id>/", views.delete_homework, name='delete_homework'),
    path("tutor/delete_supplement/<int:tutor_id>/", views.delete_supplement, name='delete_supplement'),
    path("tutor/get_progress/<int:tutor_id>/", views.get_progress, name='get_progress'),
    path("tutor/get_homeworks/<int:tutor_id>/", views.get_homework, name='get_homework'),
    path("tutor/get_supplements/<int:tutor_id>/", views.get_supplement, name='get_supplement'),
    path("calendar/add_time/<int:user_id>/", views.add_time, name='add_time'),
    path("calendar/get_time/<int:user_id>/", views.get_time, name='get_time'),
    path("tutor/add_score/<int:tutor_id>/", views.add_score, name='tutor_score'),
]