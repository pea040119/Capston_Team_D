from .account_views import signup_view, login_view
from .tutor_views import class_register,  class_time_set, student_schedule, class_student_set

def home(request):
    return HttpResponse('홈 페이지')