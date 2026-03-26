from django.urls import path,include
from .views import UserViewSet,HomeViewSet,SetsViewSet,TopsViewSet,CheckoutViewSet,BottomsViewSet,CartViewSet,CartitemsViewSet,OrdersViewSet,ProfileViewSet,wishlistViewSet,wishlistItemsViewSet, search_products
from rest_framework.authtoken.views import obtain_auth_token

from rest_framework.routers import DefaultRouter


router = DefaultRouter()

router.register(r'users', UserViewSet)
router.register(r'home', HomeViewSet)
router.register(r'sets', SetsViewSet)
router.register(r'tops', TopsViewSet)
router.register(r'bottoms', BottomsViewSet)
router.register(r'cart', CartViewSet)
router.register(r'cartitems', CartitemsViewSet)
router.register(r'orders', OrdersViewSet)
router.register(r'profile', ProfileViewSet)
router.register(r'checkout', CheckoutViewSet)
router.register(r'wishlist', wishlistViewSet)
router.register(r'wishlistItems', wishlistItemsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-token-auth/', obtain_auth_token),
    path('search/', search_products, name='search_products'),
]
