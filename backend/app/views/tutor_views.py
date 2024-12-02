import json
from django.http import HttpResponse
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from app import models as table
from app.serializers import UserAccountSerializer 


# 수업 등록 API - StudentModal.jsx
@api_view(['POST'])
def class_create(request):
    print(request.data)
    subject = request.data.get('subject')
    tutor_id = request.data.get("tutor_id")
    fee = request.data.get('fee')
    grade = request.data.get('grade')
    name = request.data.get('name')
    schedule = request.data.get('schedule')
    try:
        print(grade)
        tutor = table.Tutor.objects.get(user_id=tutor_id)
    except table.Tutor.DoesNotExist:
        print("정보 없음")
        return Response({'message': '튜터 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    
    print(request.data)
    _class = table.Class.objects.create(subject=subject, tutor_id=tutor, tuition=fee, grade = grade, scheduled_classes = schedule, student_name = name)
    return Response({'message': '수업 등록 성공!', 'class': _class.class_id})

# 본인 학생 조회 API - Tutor.jsx
@api_view(['GET'])
def get_student_list(request, tutor_id):
    try: 
        print(tutor_id)
        tutor = table.Tutor.objects.get(user_id = tutor_id)
    except table.Tutor.DoesNotExist:
        print("정보 없음")
        return Response({'message': '튜터 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    classes = table.Class.objects.filter(tutor_id=tutor).values('student_name', 'scheduled_classes', 'grade', 'subject', 'tuition')
    class_data = list(classes) 
    print(class_data)
    return Response({'classes': class_data})

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

@api_view(['GET'])
def get_daily(request, tutor_id):
    return Response({'message': '수업 정보가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST) 
    # dailies_data = []
    # for daily in dailies:
    #     dailies_data.append({
    #         "daily_id": daily.daily_id,
    #         "contents": daily.contents,
    #         "memo": daily.memo
    #     })
    # return Response({'message': '일일 수업 조회 성공!', 'dailies': dailies_data})


@api_view(['POST'])
def add_daily(request, tutor_id):
    try:
        data = json.loads(request.body)
        tutor = table.Tutor.objects.get(user_id=tutor_id)
        print(data)

        # Daily 객체 생성 또는 기존 객체 업데이트
        daily = table.Daily.objects.create(
            tutor_id=tutor,
            last_progress=data['lastprogress'],
            progress=data['progress'],
            parent_message=data['parentMessage'],
            word_test_result=data['examResults']['wordTest'],
            mock_exam_result=data['examResults']['mockExam'],
            dictation_result=data['examResults']['dictation'],
            assignment=data['assignment'],
        )
        return Response({'message': '일일 수업 데이터가 성공적으로 저장되었습니다'})
        # return Response({'message': '학생 데이터가 성공적으로 저장되었습니다', 'created': created})
    except table.Tutor.DoesNotExist:
        return Response({'error': '유효하지 않은 tutor_id 입니다'}, status=400)
    except table.Student.DoesNotExist:
        return Response({'error': '유효하지 않은 student_id 입니다'}, status=400)
    except json.JSONDecodeError:
        return Response({'error': '잘못된 JSON 형식입니다'}, status=400)
    except Exception as e:
        print(e)
        return Response({'error': str(e)}, status=500)
    
    
@api_view(['POST'])
def add_calendar(request, tutor_id):
    try:
        data = json.loads(request.body)
        tutor = table.Tutor.objects.get(user_id=tutor_id)

        # Calendar 객체 생성
        calendar = table.Classtime.objects.create(
            tutor_id=tutor,
            date=data['date'],
            day=data['day'],
            time=data['time'],
            student=data.get('student_id', '')
        )
        
    except table.Tutor.DoesNotExist:
        return Response({'error': '유효하지 않은 tutor_id 입니다'}, status=400)
    except table.Student.DoesNotExist:
        return Response({'error': '유효하지 않은 student_id 입니다'}, status=400)
    except json.JSONDecodeError:
        return Response({'error': '잘못된 JSON 형식입니다'}, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    
@api_view(['POST'])
def add_progress(request, tutor_id):
    try:
        data = json.loads(request.body)
        print(data)
        tutor = table.Tutor.objects.get(user_id=tutor_id)
        print("test")
        progress = table.Progress.objects.create(
            tutor_id=tutor,
            name=data['name'],
            period=data['period']
        )
        
        return Response({'message': '진도 생성 성공!'})
    except json.JSONDecodeError:
        return Response({'error': '잘못된 JSON 형식입니다.'}, status=400)
    except table.Tutor.DoesNotExist:
        return Response({'error': '유효하지 않은 tutor_id 입니다'}, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

    
@api_view(['POST'])
def delete_progress(request, tutor_id):
    try:
        data = json.loads(request.body)
        tutor = table.Tutor.objects.get(user_id=tutor_id)
        progress = table.Progress.objects.get(tutor_id=tutor, name=data['name'])
        progress.delete()
        return Response({'message': '진도 삭제 성공!'})
    except table.Tutor.DoesNotExist:
        return Response({'error': '유효하지 않은 tutor_id 입니다'}, status=400)
    except json.JSONDecodeError:
        return Response({'error': '잘못된 JSON 형식입니다'}, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['POST'])
def add_homework(request, tutor_id):
    try:
        data = json.loads(request.body)
        tutor = table.Tutor.objects.get(user_id=tutor_id)
        assignment = table.Assignment.objects.create(
            tutor_id=tutor,
            name=data['name'],
            assignment=data['assignment']
        )
        return Response({'message': '과제 생성 성공!'})
    except table.Tutor.DoesNotExist:
        return Response({'error': '유효하지 않은 tutor_id 입니다'}, status=400)
    except json.JSONDecodeError:
        return Response({'error': '잘못된 JSON 형식입니다'}, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    
@api_view(['POST'])
def delete_homework(request, tutor_id):
    try:
        data = json.loads(request.body)
        tutor = table.Tutor.objects.get(user_id=tutor_id)
        assignment = table.Assignment.objects.filter(tutor_id=tutor, name=data['name'])
        assignment.delete()
        return Response({'message': '과제 삭제 성공!'})
    except table.Tutor.DoesNotExist:
        return Response({'error': '유효하지 않은 tutor_id 입니다'}, status=400)
    except json.JSONDecodeError:
        return Response({'error': '잘못된 JSON 형식입니다'}, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    
@api_view(['POST'])
def add_supplement(request, tutor_id):
    try:
        data = json.loads(request.body)
        tutor = table.Tutor.objects.get(user_id=tutor_id)
        supplement = table.Supplements.objects.create(
            tutor_id=tutor,
            name=data["name"],
        )
        return Response({'message': '보충 자료 생성 성공!'})
    except table.Tutor.DoesNotExist:
        return Response({'error': '유효하지 않은 tutor_id 입니다'}, status=400)
    except json.JSONDecodeError:
        return Response({'error': '잘못된 JSON 형식입니다'}, status=400)
    except Exception as e:
        print(e)
        return Response({'error': str(e)}, status=500)
    
    
@api_view(['POST'])
def delete_supplement(request, tutor_id):
    try:
        data = json.loads(request.body)
        tutor = table.Tutor.objects.get(user_id=tutor_id)
        supplement = table.Supplements.objects.filter(tutor_id=tutor, name=data['name'])
        supplement.delete()
        
        return Response({'message': '보충 자료 삭제 성공!'})
    except table.Tutor.DoesNotExist:
        return Response({'error': '유효하지 않은 tutor_id 입니다'}, status=400)
    except json.JSONDecodeError:
        return Response({'error': '잘못된 JSON 형식입니다'}, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    

@api_view(['GET'])
def get_progress(request, tutor_id):
    try:
        tutor = table.Tutor.objects.get(user_id=tutor_id)
        progress = table.Progress.objects.filter(tutor_id=tutor)
        progress_data = []
        for item in progress:
            progress_data.append({
                'name': item.name,
                'period': item.period
            })
        return Response({'message': '진도 조회 성공!', 'progress': progress_data})
    except table.Tutor.DoesNotExist:
        return Response({'error': '유효하지 않은 tutor_id 입니다'}, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    

@api_view(['GET'])
def get_homework(request, tutor_id):
    try:
        tutor = table.Tutor.objects.get(user_id=tutor_id)
        homework = table.Assignment.objects.filter(tutor_id=tutor)
        homework_data = []
        if not homework:
            return Response({'message': '과제가 없습니다.', 'homeworks': homework_data})
        for item in homework:
            homework_data.append({
                'name': item.name,
                'assignment': item.assignment
            })
        return Response({'message': '과제 조회 성공!', 'homeworks': homework_data})
    except table.Tutor.DoesNotExist:
        return Response({'error': '유효하지 않은 tutor_id 입니다'}, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    

@api_view(['GET'])
def get_supplement(request, tutor_id):
    try:
        tutor = table.Tutor.objects.get(user_id=tutor_id)
        supplements = table.Supplements.objects.filter(tutor_id=tutor).values('name')
        data = list(supplements)
        print(data)
        supplements_data = []
        for item in data:
            supplements_data.append({
                'name': item['name']
            })
        return Response({'message': '보충 자료 조회 성공!', 'supplements': supplements_data})
    except table.Tutor.DoesNotExist:
        return Response({'error': '유효하지 않은 tutor_id 입니다'}, status=400)
    except table.Supplements.DoesNotExist:
        return Response({'message': '보충 자료가 없습니다.', 'supplements': []})
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    
@api_view(['POST'])
def add_time(request, user_id):
    try:
        data = json.loads(request.body)
        user = table.UserAccount.objects.get(user_id=user_id)
        print(user_id)
        print(data)
        calendar = table.D_Day.objects.create(
            user_id=user,
            name = data['text'],
            color = data['color'],
            date = data['date']
        )
        return Response({'message': '시간 추가 성공!'})
    except table.UserAccount.DoesNotExist:
        return Response({'error': '유효하지 않은 user_id 입니다'}, status=400)
    except json.JSONDecodeError:
        return Response({'error': '잘못된 JSON 형식입니다'}, status=400)
    except Exception as e:
        print(e)
        return Response({'error': str(e)}, status=500)
    
    
@api_view(['GET'])
def get_time(request, user_id):
    try:
        user = table.UserAccount.objects.get(user_id=user_id)
        time = table.D_Day.objects.filter(user_id=user)
        time_data = []
        for item in time:
            time_data.append({
                'name': item.name,
                'color': item.color,
                'date': item.date
            })
        return Response({'message': '시간 조회 성공!', 'time': time_data})
    except table.UserAccount.DoesNotExist:
        return Response({'error': '유효하지 않은 user_id 입니다'}, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=500)