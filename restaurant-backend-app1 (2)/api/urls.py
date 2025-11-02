from django.urls import path
from . import views
from .views import CategoryListCreate,DaywiseProfits

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('categories/', CategoryListCreate.as_view(), name='category-list-create'),
    path('viewcart/',views.Getcart.as_view(),name='cart'),
    path('Order/',views.Orderitem.as_view(),name='order'),
    path('dayprofits/',DaywiseProfits.as_view(),name='profits'),
]
