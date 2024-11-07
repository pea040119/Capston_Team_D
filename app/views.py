from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def login_view(request):
    # 클라이언트에서 보낸 아이디와 비밀번호를 가져옵니다.
    username = request.data.get('username')
    password = request.data.get('password')

    # 사용자가 존재하는지 확인
    user = authenticate(username=username, password=password)

    if user is not None:
        # 로그인 성공
        return Response({'message': '로그인 성공', 'user': user.username})
    else:
        # 로그인 실패
        return Response({'message': '로그인 실패'}, status=400)
