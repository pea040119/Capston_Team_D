from django.http import HttpResponse
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from app import models as table\
    
    
@api_view(['GET'])
def week_schedule(user):
    student = table.Student.objects.get(user_id=user.user_id)
    try:
        classes = table.Class.objects.filter(student=student.student_id)
    except table.Class.DoesNotExist:
        classes = []
    
    times = {}
    for _class in classes:
        times.update({_class.class_id: [(time.day, time.time) for time in table.Daily.objects.filter(class_id=_class.class_id)]})
    d_days = [d_day.data for d_day in table.D_Day.objects.filter(user_id=user.user_id)]
    
    return Response({'message': '주간 시간표', 'time': times, 'd_day': d_days})


@api_view(['POST'])
def d_day_create(request):
    name = request.data.get('name')
    user_id = request.data.get('user_id')
    try:
        user = table.UserAccount.objects.get(user_id=user_id)
    except table.UserAccount.DoesNotExist:
        return Response({'message': '사용자 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    d_day = table.D_Day.objects.create(name=name, user_id=user_id)
    return Response({'message': 'D-Day 등록 성공!', 'd_day': d_day.d_day_id}, status)