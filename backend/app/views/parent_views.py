from django.contrib.auth.hashers import make_password, check_password
from django.http import HttpResponse
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import models as table
from .serializers import UserAccountSerializer 