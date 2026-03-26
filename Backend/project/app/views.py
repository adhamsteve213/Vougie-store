from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets,permissions, status
from rest_framework.response import Response
from django .contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.db.models import Q
from .serializers import UserSerializer,HomeSerializer,CheckoutSerializer,SetsSerializer,TopsSerializer,BottomsSerializer,CartSerializer,CartitemsSerializer,OrdersSerializer,ProfileSerializer,wishlistSerializer,wishlistItemsSerializer, OrderItemSerializer
from .models import Home,Sets,Tops,Bottoms,Cart,Cartitems,Orders,Profile,wishlist,wishlistItems,Checkout,OrderItem
# Create your views here.

class AllowCreate(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action == 'create':
            return True
        return request.user and request.user.is_authenticated

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowCreate]

    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(id=user.id)

class HomeViewSet(viewsets.ModelViewSet):
    queryset = Home.objects.all()
    serializer_class = HomeSerializer

class SetsViewSet(viewsets.ModelViewSet):
    queryset = Sets.objects.all()
    serializer_class = SetsSerializer

class TopsViewSet(viewsets.ModelViewSet):
    queryset = Tops.objects.all()
    serializer_class = TopsSerializer

class BottomsViewSet(viewsets.ModelViewSet):
    queryset = Bottoms.objects.all()
    serializer_class = BottomsSerializer

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Cart.objects.filter(user=user)

class CartitemsViewSet(viewsets.ModelViewSet):
    queryset = Cartitems.objects.all()
    serializer_class = CartitemsSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Cartitems.objects.filter(cart__user=user)

    def create(self, request, *args, **kwargs):
        product_id = request.data.get('product_id')
        category = request.data.get('category')
        quantity = request.data.get('quantity', 1)

        if not product_id or not category:
            return Response({'error': 'product_id and category are required'}, status=status.HTTP_400_BAD_REQUEST)

        model_map = {
            'home': Home,
            'sets': Sets,
            'tops': Tops,
            'bottoms': Bottoms,
        }
        model = model_map.get(category.lower())
        if not model:
            return Response({'error': 'Invalid category'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = model.objects.get(id=product_id)
        except model.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        cart, created = Cart.objects.get_or_create(user=request.user)
        content_type = ContentType.objects.get_for_model(product)

        # Check if item already exists
        existing_item = Cartitems.objects.filter(cart=cart, content_type=content_type, object_id=product.id).first()
        if existing_item:
            existing_item.quantity += quantity
            existing_item.save()
            serializer = self.get_serializer(existing_item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            cart_item = Cartitems.objects.create(
                cart=cart,
                content_type=content_type,
                object_id=product.id,
                price=product.price,
                quantity=quantity
            )
            serializer = self.get_serializer(cart_item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
class CheckoutViewSet(viewsets.ModelViewSet):
    queryset = Checkout.objects.all()
    serializer_class = CheckoutSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Checkout.objects.filter(user=user)
    

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Profile.objects.filter(user=user)

class wishlistViewSet(viewsets.ModelViewSet):
    queryset = wishlist.objects.all()
    serializer_class = wishlistSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return wishlist.objects.filter(user=user)

class wishlistItemsViewSet(viewsets.ModelViewSet):
    queryset = wishlistItems.objects.all()
    serializer_class = wishlistItemsSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return wishlistItems.objects.filter(wishlist__user=user)

    def create(self, request, *args, **kwargs):
        product_id = request.data.get('product')
        category = request.data.get('category')

        if not product_id or not category:
            return Response({'error': 'product and category are required'}, status=status.HTTP_400_BAD_REQUEST)

        model_map = {
            'home': Home,
            'sets': Sets,
            'tops': Tops,
            'bottoms': Bottoms,
        }
        model = model_map.get(category.lower())
        if not model:
            return Response({'error': 'Invalid category'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = model.objects.get(id=product_id)
        except model.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        # Use a different local name to avoid shadowing the imported `wishlist` model
        user_wishlist, created = wishlist.objects.get_or_create(user=request.user)
        content_type = ContentType.objects.get_for_model(product)

        # Check if item already exists
        existing_item = wishlistItems.objects.filter(wishlist=user_wishlist, content_type=content_type, object_id=product.id).first()
        if existing_item:
            return Response({'error': 'Item already in wishlist'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            wishlist_item = wishlistItems.objects.create(
                wishlist=user_wishlist,
                content_type=content_type,
                object_id=product.id
            )
            serializer = self.get_serializer(wishlist_item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)



class OrdersViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Orders.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        cart_items_ids = request.data.get('cart_items', [])
        if not cart_items_ids:
            return Response({'error': 'No cart items provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Get cart items for the authenticated user
        cart_items = Cartitems.objects.filter(id__in=cart_items_ids, cart__user=request.user)
        if not cart_items.exists():
            return Response({'error': 'Invalid cart items'}, status=status.HTTP_400_BAD_REQUEST)

        # Create a single Checkout instance with shipping info
        checkout_data = {
            'user': request.user,
            'first_name': request.data.get('first_name'),
            'middle_name': request.data.get('middle_name'),
            'last_name': request.data.get('last_name'),
            'phone_number': request.data.get('phone_number'),
            'address': request.data.get('address'),
        }
        checkout_instance = Checkout.objects.create(**checkout_data)

        # Calculate total price
        total_price = sum(item.price * item.quantity for item in cart_items)

        # Create a single Order
        order = Orders.objects.create(
            user=request.user,
            checkout=checkout_instance,
            total_price=total_price
        )

        # Create OrderItems for each cart item
        for item in cart_items:
            OrderItem.objects.create(
                order=order,
                content_type=item.content_type,
                object_id=item.object_id,
                quantity=item.quantity,
            )

        # Clear cart items
        cart_items.delete()

        # Serialize and return the created order
        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

def search_products(request):
    query = request.GET.get('q', '')
    if not query:
        return JsonResponse({'error': 'Query parameter is required'}, status=400)

    # Search across all product models
    home_results = Home.objects.filter(Q(name__icontains=query) | Q(description__icontains=query))
    sets_results = Sets.objects.filter(Q(name__icontains=query) | Q(description__icontains=query))
    tops_results = Tops.objects.filter(Q(name__icontains=query) | Q(description__icontains=query))
    bottoms_results = Bottoms.objects.filter(Q(name__icontains=query) | Q(description__icontains=query))

    # Combine results
    results = []
    for product in home_results:
        results.append({
            'id': product.id,
            'name': product.name,
            'price': str(product.price),
            'image': product.image.url if product.image else None,
            'description': product.description,
            'category': 'home'
        })
    for product in sets_results:
        results.append({
            'id': product.id,
            'name': product.name,
            'price': str(product.price),
            'image': product.image.url if product.image else None,
            'description': product.description,
            'category': 'sets'
        })
    for product in tops_results:
        results.append({
            'id': product.id,
            'name': product.name,
            'price': str(product.price),
            'image': product.image.url if product.image else None,
            'description': product.description,
            'category': 'tops'
        })
    for product in bottoms_results:
        results.append({
            'id': product.id,
            'name': product.name,
            'price': str(product.price),
            'image': product.image.url if product.image else None,
            'description': product.description,
            'category': 'bottoms'
        })

    return JsonResponse({'results': results})
