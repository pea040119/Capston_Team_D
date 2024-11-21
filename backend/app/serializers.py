# serializers.py
from rest_framework import serializers
from .models import UserAccount, Parent, Student, Tutor, D_Day, Class, Daily, Assignment, Score, Progress, Supplements, Classtime

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'

class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutor
        fields = '__all__'

class D_DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = D_Day
        fields = '__all__'

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'

class DailySerializer(serializers.ModelSerializer):
    class Meta:
        model = Daily
        fields = '__all__'

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'

class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = '__all__'

class ProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Progress
        fields = '__all__'

class SupplementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplements
        fields = '__all__'

class ClasstimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classtime
        fields = '__all__'
