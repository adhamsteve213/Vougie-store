from rest_framework import serializers
from .models import Sets,Tops,Bottoms,Cart,Cartitems,Orders,Profile,wishlist,wishlistItems,Home, OrderItem, Checkout
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home
        fields = '__all__'

class SetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sets
        fields = '__all__'

class TopsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tops
        fields = '__all__'

class BottomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bottoms
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class CartitemsSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()

    class Meta:
        model = Cartitems
        fields = '__all__'

    def get_product(self, obj):
        return {
            'id': obj.product.id,
            'name': obj.product.name,
            'price': obj.product.price,
            'image': obj.product.image.url if obj.product.image else None,
            'description': obj.product.description,
        }

class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity']

    def get_product(self, obj):
        product = obj.content_object
        return {
            'name': product.name,
            'price': product.price,
            'image': product.image.url if hasattr(product, 'image') and product.image else None,
        }

class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkout
        fields = ['first_name', 'middle_name', 'last_name', 'phone_number', 'address']

class OrdersSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    checkout = CheckoutSerializer(read_only=True)
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2, source='total_price', read_only=True)

    class Meta:
        model = Orders
        fields = ['id', 'user', 'total_amount', 'created_at', 'status', 'items', 'checkout']
        read_only_fields = ['id', 'user', 'created_at', 'status', 'items', 'checkout', 'total_amount']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.update(CheckoutSerializer(instance.checkout).data)
        return representation

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class wishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = wishlist
        fields = '__all__'

class wishlistItemsSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()

    class Meta:
        model = wishlistItems
        fields = '__all__'

    def get_product(self, obj):
        category = obj.content_type.model
        return {
            'id': obj.product.id,
            'name': obj.product.name,
            'price': obj.product.price,
            'image': obj.product.image.url if obj.product.image else None,
            'description': obj.product.description,
            'category': category,
        }

class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'token']
        extra_kwargs = {'password': {'write_only': True,"required":True}}
        read_only_fields = ['id']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

    def get_token(self,obj):
        token, created = Token.objects.get_or_create(user=obj)
        return token.key
