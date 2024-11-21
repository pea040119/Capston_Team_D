import json
from django.http import HttpResponse
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from app import models as table
from app.serializers import UserAccountSerializer 


# 수업 등록 API 
@api_view(['POST'])
def class_create(request):
    print(request.data)
    subject = request.data.get('subject')
    tutor_id = request.data.get("tutor_id")
    fee = request.data.get('fee')
    grade = request.data.get('grade')
    name = request.data.get('name')
    try:
        tutor = table.Tutor.objects.get(tutor_id=tutor_id)
    except table.Tutor.DoesNotExist:
        return Response({'message': '튜터 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        student_id = table.Student.objects.get(name=name)
    except table.Student.DoesNotExist:
        return Response({'message': '학생 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    _class = table.Class.objects.create(subject=subject, tutor_id=tutor_id, tutation=fee, grade = grade, student_id=student_id)
    return Response({'message': '수업 등록 성공!', 'class': _class.class_id}, status)

# 수업 시간 설정 API
@api_view(['POST'])
def class_set_time(request):
    class_id = request.data.get('class_id')
    try:
        _class = table.Class.objects.get(class_id=class_id)
    except table.Class.DoesNotExist:
        return Response({'message': '수업 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    day = request.data.get('day')
    time = request.data.get('time')
    daily = table.Classtime.objects.create(class_id=class_id, day=day, time=time)
    return Response({'message': '수업 시간 설정 성공!'}, status)

    
# 수업 - 학생 연결 API
@api_view(['POST'])
def class_set_student(request):
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
    _class.student = student
    _class.save()
    return Response({'message': '학생 등록 성공!'}, status)


@api_view(['POST'])
def class_set_parent(request):
    class_id = request.data.get('class_id')
    parent_id = request.data.get('parent_id')
    try:
        parent = table.Parent.objects.get(parent_id=parent_id)
    except table.Parent.DoesNotExist:
        return Response({'message': '부모 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        _class = table.Class.objects.get(class_id=class_id)
    except table.Class.DoesNotExist:
        return Response({'message': '수업 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    _class.parent = parent
    _class.save()
    return Response({'message': '부모 등록 성공!'}, status)


@api_view(['POST'])
def class_add_point(request):
    class_id = request.data.get('class_id')
    point = request.data.get('point')
    try:
        _class = table.Class.objects.get(class_id=class_id)
    except table.Class.DoesNotExist:
        return Response({'message': '수업 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    _class.point += point
    _class.save()
    return Response({'message': '포인트 설정 성공!'}, status)


@api_view(['POST'])
def daily_create(request):
    class_id = request.data.get('class_id')
    contents = request.data.get('contents')
    memo = request.data.get('memo')
    assignment = request.data.get('assignment')
    try:
        _class = table.Class.objects.get(class_id=class_id)
    except table.Class.DoesNotExist:
        return Response({'message': '수업 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    daily = table.Daily.objects.create(class_id=class_id, contents=contents, memo=memo)
    if assignment == None or assignment == '':
        table.Assignment.objects.create(tutor_id=_class.tutor_id, daily_id=daily.daily_id, contents=assignment, state=False)
        
    return Response({'message': '일일 수업 생성 성공!'}, status)


@api_view(['POST'])
def assignment_create(request):
    tutor_id = request.data.get('tutor_id')
    daily_id = request.data.get('daily_id')
    due = request.data.get('due')
    contents = request.data.get('contents')
    state = request.data.get('state')
    try:
        tutor = table.Tutor.objects.get(tutor_id=tutor_id)
    except table.Tutor.DoesNotExist:
        return Response({'message': '튜터 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        daily = table.Daily.objects.get(daily_id=daily_id)
    except table.Daily.DoesNotExist:
        return Response({'message': '일일 수업 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    assignment = table.Assignment.objects.create(tutor_id=tutor_id, daily_id=daily_id, due=due, contents=contents, state=state)
    return Response({'message': '과제 생성 성공'}, status)


@api_view(['POST'])
def class_set_score(request):
    class_id = request.data.get('class_id')
    student_id = request.data.get('student_id')
    type = request.data.get('type')
    grade = json.dumps({"grade": []})
    try:
        _class = table.Class.objects.get(class_id=class_id)
    except table.Class.DoesNotExist:
        return Response({'message': '수업 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        student = table.Student.objects.get(student_id=student_id)
    except table.Student.DoesNotExist:
        return Response({'message': '학생 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    score = table.Score.objects.create(class_id=class_id, student_id = student_id, type=type, grade=grade)
    return Response({'message': '성적 생성 성공!'}, status)


@api_view(['POST'])
def class_add_score(request):
    class_id = request.data.get('class_id')
    student_id = request.data.get('student_id')
    grade = request.data.get('grade')
    try:
        _class = table.Class.objects.get(class_id=class_id)
    except table.Class.DoesNotExist:
        return Response({'message': '수업 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        student = table.Student.objects.get(student_id=student_id)
    except table.Student.DoesNotExist:
        return Response({'message': '학생 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    score = table.Score.objects.get(class_id=class_id, student_id=student_id)
    grades = json.loads(score.grade)
    grades["grade"].append(grade)
    score.grade = json.dumps(grades)
    score.save()
    return Response({'message': '성적 추가 성공!'}, status)
        


@api_view(['POST'])
def progress_create(request):
    class_id = request.data.get('class_id')
    subject = request.data.get('subject')
    unit = request.data.get('unit')
    try:
        _class = table.Class.objects.get(class_id=class_id)
    except table.Class.DoesNotExist:
        return Response({'message': '수업 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    progress = table.Progress.objects.create(class_id=class_id, subject=subject, unit=unit)
    return Response({'message': '진도 생성 성공'}, status)


@api_view(['POST'])
def supplements_create(request):
    class_id = request.data.get('class_id')
    contents = request.data.get('contents')
    file_name = request.data.get('file_name')
    file_data = request.data.get('file_data')
    try:
        _class = table.Class.objects.get(class_id=class_id)
    except table.Class.DoesNotExist:
        return Response({'message': '수업 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    supplements = table.Supplements.objects.create(class_id=class_id, contents=contents, file_name=file_name, file_data=file_data)
    return Response({'message': '보충 자료 생성 성공'}, status)