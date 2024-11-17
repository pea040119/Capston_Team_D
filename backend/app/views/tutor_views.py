from django.contrib.auth.hashers import make_password, check_password
from django.http import HttpResponse
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from app import models as table
from app.serializers import UserAccountSerializer 


# 수업 등록 API 
@api_view(['POST'])
def class_register(request):
    subject = request.data.get('subject')
    tutor_id = request.data.get("tutor_id")
    _class = table.Class.objects.create(subject=subject, tutor_id=tutor_id)
    return Response({'message': '수업 등록 성공!', 'class': _class.class_id}, status)

# 수업 시간 설정 API
@api_view(['POST'])
def class_time_set(request):
    class_id = request.data.get('class_id')
    try:
        _class = table.Class.objects.get(class_id=class_id)
    except table.Class.DoesNotExist:
        return Response({'message': '수업 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    day = request.data.get('day')
    time = request.data.get('time')
    daily = table.Classtime.objects.create(class_id=class_id, day=day, time=time)

# 시간표 조회 API (student page)
@api_view(['GET'])
def student_schedule(user):
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





    
# 수업 - 학생 연결 API
@api_view(['POST'])
def class_student_set(request):
    class_id = request.data.get('class_id')
    student_id = request.data.get('student_id')
    try:
        student = table.Student.objects.get(student_id=student_id)
    except table.Student.DoesNotExist:
        return Response({'message': '학생 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        _class = table.Class.objects.get(class_id=class_id)
    except table.Class.DoesNotExist:
        return Response({'message': '수업 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    _class.student.add(student)
    return Response({'message': '학생 등록 성공!'}, status)


