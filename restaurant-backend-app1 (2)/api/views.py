from rest_framework.response import Response
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework import status
from django.contrib.auth import authenticate
from .models import User
from .serializers import RegisterSerializer
from .serializers import CategorySerializer
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        uobj=serializer.save()    
        token, created = Token.objects.get_or_create(user=uobj) #Create Token to pass
        return Response({"message": "User registered successfully!",'token':token.key}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(email=email, password=password)

    if user is not None:
        # Delete old token (Optional but good practice)
        Token.objects.filter(user=user).delete()
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            "message": "Login successful!",
            "token": token.key,
            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "contact": user.contact,
                "is_superuser": user.is_superuser,
                "is_staff": user.is_staff
            }
        }, status=status.HTTP_200_OK)

    return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

from rest_framework import generics,permissions
from .models import Category,Cart,Order,OrderItem
from rest_framework import serializers
from .serializers import CategorySerializer,Cartserializer,Orderserializer,Addressserializer
from django.core.exceptions import ValidationError
from django.db.models import Sum
from django.db.models.functions import TruncDate  # TO get the date only in the datetime portion


class CategoryListCreate(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class Getcart(generics.ListCreateAPIView):
    serializer_class = Cartserializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        user=self.request.user
        category_id = self.request.data.get('category')  #gets the id
        category = Category.objects.get(id=category_id)  #gets the object of that id
        try:
            category = Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            raise serializers.ValidationError({'category': 'Invalid category ID'})

        # Check if this item is already in cart
        existing_item = Cart.objects.filter(user=user, category=category).first()

        if existing_item:
            # If already exists, update quantity 
            existing_item.quantity += 1
            existing_item.save()
            return existing_item

        serializer.save(user=user, category=category)
        #    serializer.save(user=self.request.user, category=category)
        #    print(category)
         #   print(category_id)


class Orderitem(generics.ListCreateAPIView):
    serializer_class = Orderserializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-added_on')
    def perform_create(self, serializer):
        user=self.request.user
        cart_items=Cart.objects.filter(user=user)

        if not cart_items.exists():
            raise ValidationError("Your cart is empty.")

        total = sum(float(item.category.price) * item.quantity for item in cart_items)
        order = serializer.save(user=user, total=total)

        for item in cart_items:
            OrderItem.objects.create(
                order=order,
                category=item.category,
                quantity = item.quantity
            )

        cart_items.delete()
        return order
    

    
class DaywiseProfits(APIView):
    def get(self,request):
        profits=(
            Order.objects.annotate(day=TruncDate('added_on')).values('day').annotate(total_sum=Sum('total')).order_by('day')
        )
        return Response(profits)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_cart(request, pk):
    try:
        cart_item = Cart.objects.get(id=pk, user=request.user)
    except Cart.DoesNotExist:
        return Response({"error": "Cart item not found."}, status=status.HTTP_404_NOT_FOUND)

    new_qty = request.data.get("quantity")
    if not new_qty or int(new_qty) < 1:
        return Response({"error": "Invalid quantity."}, status=status.HTTP_400_BAD_REQUEST)

    cart_item.quantity = int(new_qty)
    cart_item.save()
    serializer = Cartserializer(cart_item)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_cart_item(request, pk):
    try:
        cart_item = Cart.objects.get(id=pk, user=request.user)
    except Cart.DoesNotExist:
        return Response({"error": "Cart item not found."}, status=status.HTTP_404_NOT_FOUND)

    cart_item.delete()
    return Response({"message": "Item removed successfully."}, status=status.HTTP_204_NO_CONTENT)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    try:
        # Delete the user's current token
        request.user.auth_token.delete()
        return Response({"message": "Logout successful!"}, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "Invalid request or already logged out."},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_address(request):
    serializer = Addressserializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from . models import Address

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_addresses(request):
    addresses = Address.objects.filter(user=request.user).order_by('-created_at')
    serializer = Addressserializer(addresses, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


