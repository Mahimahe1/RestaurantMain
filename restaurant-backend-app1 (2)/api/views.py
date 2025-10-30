from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth import authenticate
from .models import User
from .serializers import RegisterSerializer
from .serializers import CategorySerializer
from rest_framework.views import APIView
@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(email=email, password=password)
    if user is not None:
        return Response({"message": "Login successful!"}, status=status.HTTP_200_OK)
    return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)
from rest_framework import generics
from .models import Category
from .serializers import CategorySerializer

class CategoryListCreate(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer