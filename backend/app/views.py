from django.contrib.auth.hashers import make_password, check_password
from django.http import HttpResponse
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import models as table
from .serializers import UserAccountSerializer 


def home(request):
    return HttpResponse('홈 페이지')

#회원가입 API
@api_view(['POST'])
def signup_view(request):
    login_id = request.data.get('login_id')
    login_pw = request.data.get('login_pw')
    name = request.data.get('name')
    role = request.data.get('role') 
    
    valid_roles = ['STUDENT', 'TEACHER', 'PARENT', 'student', 'teacher', 'parent']
    if role not in valid_roles:
        print("invalid role")
        return Response({'message': '지정되지 않은 역할입니다.'}, status=status.HTTP_400_BAD_REQUEST)

    if table.UserAccount.objects.filter(login_id=login_id).exists():
        return Response({'message': '이미 존재하는 아이디입니다.'}, status=status.HTTP_400_BAD_REQUEST)
    
    
    hashed_password = make_password(login_pw)
    user = table.UserAccount.objects.create(login_id=login_id, login_pw=hashed_password, name=name, role=role)

    user_data = UserAccountSerializer(user).data
    return Response({'message': '회원가입 성공!', 'user': user_data}, status=status.HTTP_201_CREATED)

# 로그인 API
@api_view(['POST'])
def login_view(request):
    print(request.data)
    login_id = request.data.get('login_id')
    login_pw = request.data.get('login_pw')

    try:
        user = table.UserAccount.objects.get(login_id=login_id)
    except table.UserAccount.DoesNotExist:
        return Response({'message': '아이디 또는 비밀번호가 올바르지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    if check_password(login_pw, user.login_pw):
        if user.role == 'Student' or user.role == 'student':
            return redirect(user)
        return Response({'message': '로그인 성공', 'user': user.name})
    else:
        return Response({'message': '아이디 또는 비밀번호가 올바르지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def student(user):
    student = table.Student.objects.get(user_id=user.user_id)
    try:
        classes = table.Class.objects.filter(student=student.student_id)
    except table.Class.DoesNotExist:
        classes = []
    
    times = {}
    for _class in classes:
        times.update({_class.class_id: [(time.day, time.time) for time in table.Daily.objects.filter(class_id=_class.class_id)]})
    d_days = [d_day.data for d_day in table.D_Day.objects.filter(user_id=user.user_id)]
    
    return Response({'message': '학생 페이지입니다.', 'time': times, 'd_day': d_days})