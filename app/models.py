from django.db import models



class Role(models.TextChoices):
    TUTOR = "tutor", "Tutor"
    STUDENT = "student", "Student"
    PARENT = "parent", "Parent"
    
    
class UserAccount(models.Model):
    user_id = models.AutoField(primary_key=True)
    login_id = models.CharField(max_length=32, unique=True)
    login_pw = models.CharField(max_length=32)
    name = models.CharField(max_length=20, unique=True)
    role = models.CharField(max_length=10, choices=Role.choices, default=Role.STUDENT)
    created_at = models.DateTimeField(auto_created=True)
