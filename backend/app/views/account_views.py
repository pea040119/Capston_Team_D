from django.contrib.auth.hashers import make_password, check_password
from django.http import HttpResponse
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from app import models as table
from app.serializers import UserAccountSerializer 


@api_view(['POST'])
def signup_view(request):
    print(request)
    login_id = request.data.get('login_id')
    login_pw = request.data.get('login_pw')
    name = request.data.get('name')
    role = request.data.get('role') 

    if table.UserAccount.objects.filter(login_id=login_id).exists():
        return Response({'message': '이미 존재하는 아이디입니다.'}, status=status.HTTP_400_BAD_REQUEST)

    hashed_password = make_password(login_pw)

    user = table.UserAccount.objects.create(
        login_id=login_id,
        login_pw=hashed_password,
        name=name,
        role=role.upper()  
    )

    if role.upper() == 'PARENT':
        table.Parent.objects.create(user_id=user)
    elif role.upper() == 'STUDENT':
        table.Student.objects.create(user_id=user)
    elif role.upper() == 'TEACHER':  
        table.Tutor.objects.create(user_id=user)

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
        print("no")
        return Response({'message': '아이디 또는 비밀번호가 올바르지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    if check_password(login_pw, user.login_pw):
        user_data = {
            'user_id': user.user_id,  
            'name': user.name,
            'role': user.role,
        }
        return Response({'message': '로그인 성공', 'user': user_data})
    else:
        return Response({'message': '아이디 또는 비밀번호가 올바르지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)