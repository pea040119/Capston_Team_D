# Completed Tasks
#     UserAccount, Parent, Student, Tutor, Class, D_Day, Assignment, Daily, Score, Classtime
# Incomplete Task
#     None 
# Revision Needed
#     None

from django.db import models
from datetime import datetime
from django.utils import timezone




class Role(models.TextChoices):
    TUTOR = "tutor", "Tutor"
    STUDENT = "student", "Student"
    PARENT = "parent", "Parent"
    
    
class Grade(models.TextChoices): 
    K = "k", "유치원"
    E1 = "e1", "초1"
    E2 = "e2", "초2"
    E3 = "e3", "초3"
    E4 = "e4", "초4"
    E5 = "e5", "초5"
    E6 = "e6", "초6"
    M1 = "m1", "중1"
    M2 = "m2", "중2"
    M3 = "m3", "중3"
    H1 = "h1", "고1"
    H2 = "h2", "고2"
    H3 = "h3", "고3"
    N = "n", "N수생"
    U = "u", "대학생"
    A = "a", "성인"
    
    
class Day(models.TextChoices):
    MON = "mon", "Mon"
    TUE = "tue", "Tue"
    WED = "wed", "Wed"
    THU = "thu", "Thu"
    FRI = "fri", "Fri"
    SAT = "sat", "Sat"
    SUN = "sun", "Sun"
    
    
class UserAccount(models.Model):
    user_id = models.AutoField(primary_key=True)
    login_id = models.CharField(max_length=32, unique=True)
    login_pw = models.CharField(max_length=32)
    name = models.CharField(max_length=20)
    role = models.CharField(max_length=10, choices=Role.choices, default=Role.STUDENT)
    created_at = models.DateTimeField(auto_now_add=True)


class Parent(models.Model):
    parent_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    
    
class Student(models.Model):
    student_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    parent_id = models.ForeignKey(Parent, on_delete=models.SET_NULL, null=True)
    
    
class Tutor(models.Model):
    tutor_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    bank_account = models.CharField(max_length = 50)
    bank_name = models.CharField(max_length = 50)
    bank_depositor = models.CharField(max_length = 50)
    
    
class D_Day(models.Model):
    d_day_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    date = models.DateTimeField(default=timezone.now)


class Class(models.Model):
    class_id = models.AutoField(primary_key=True) 
    tutor_id = models.ForeignKey(Tutor, on_delete=models.SET_NULL, null=True) 
    student_id = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True)
    student_name = models.CharField(max_length=10, null=True)
    parent_id = models.ForeignKey(Parent, on_delete=models.SET_NULL, null=True)  
    subject = models.CharField(max_length=50) 
    grade = models.CharField(max_length=2, choices=Grade.choices, default=Grade.A)
    created_at = models.DateField(auto_now_add=True)  
    point = models.IntegerField(default=0) 
    scheduled_classes = models.JSONField(null=True) 
    start_date = models.DateTimeField(default=timezone.now)
    payment_status = models.JSONField(null=True)
    tuition = models.IntegerField(default=0)  
    
    
class Daily(models.Model):
    daily_id = models.AutoField(primary_key=True)
    class_id = models.ForeignKey(Class, on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)
    contents = models.TextField()
    memo = models.TextField()
    
    
class Assignment(models.Model):
    assignment_id = models.AutoField(primary_key=True)
    tutor_id = models.ForeignKey(Tutor, on_delete=models.SET_NULL, null=True)
    daily_id = models.ForeignKey(Daily, on_delete=models.SET_NULL, null=True)
    date = models.DateTimeField(auto_created=True)
    due = models.DateTimeField(default=timezone.now) 
    contents = models.TextField()
    state = models.BooleanField(default=False)
    
    
class Score(models.Model):
    score_id = models.AutoField(primary_key=True)
    class_id = models.ForeignKey(Class, on_delete=models.CASCADE)
    student_id = models.ForeignKey(Student, on_delete=models.CASCADE)
    type = models.CharField(max_length=20)
    grade = models.JSONField()
    
    
class Progress(models.Model):
    progress_id = models.AutoField(primary_key=True)
    class_id = models.ForeignKey(Class, on_delete=models.CASCADE)
    subject = models.CharField(max_length=20)
    unit = models.JSONField() 
    
    
class Supplements(models.Model):
    supplements_id = models.AutoField(primary_key=True)
    class_id = models.ForeignKey(Class, on_delete=models.CASCADE)
    contents = models.TextField() 
    file_name = models.CharField(max_length=50)
    file_data = models.BinaryField()
    
    
class Classtime(models.Model):
    classtime_id = models.AutoField(primary_key=True)
    class_id = models.ForeignKey(Class, on_delete=models.CASCADE)
    is_supply_class = models.BooleanField(default=False)
    day = models.CharField(max_length=3, choices=Day.choices, default=Day.MON)
    time = models.TimeField()