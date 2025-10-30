from django.urls import path
from . import views
from .views import CategoryListCreate
urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('categories/', CategoryListCreate.as_view(), name='category-list-create'),
]
