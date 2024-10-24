# Completed Tasks
#     UserAccount, Parent, Student, Tutor, Class
# Incomplete Task
#     D_Day, Assignment, Daily, Score, Supplements, Classtime
# Revision Needed

from django.db import models



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
    
    
class UserAccount(models.Model):
    user_id = models.AutoField(primary_key=True)
    login_id = models.CharField(max_length=32, unique=True)
    login_pw = models.CharField(max_length=32)
    name = models.CharField(max_length=20, unique=True)
    role = models.CharField(max_length=10, choices=Role.choices, default=Role.STUDENT)
    created_at = models.DateTimeField(auto_created=True)


class Parent(models.Model):
    parent_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    
    
class Student(models.Model):
    student_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    parent_id = models.ForeignKey(Parent, on_delete=models.SET_NULL)
    grade = models.CharField(max_length=2, choices=Grade.choices, default=Grade.A)
    
    
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
    date = models.DateTimeField()


class Class(models.Model):
    class_id = models.AutoField(primary_key=True) 
    tutor = models.ForeignKey(Tutor, on_delete=models.SET_NULL) 
    student = models.ForeignKey(Student, on_delete=models.SET_NULL)
    parent = models.ForeignKey(Parent, on_delete=models.SET_NULL)  
    subject = models.CharField(max_length=50) 
    created_at = models.DateField(auto_now_add=True)  
    point = models.IntegerField() 
    scheduled_classes = models.IntegerField()  
    start_date = models.DateTimeField() 
    payment_status = models.JSONField() 
    tuition = models.IntegerField()  