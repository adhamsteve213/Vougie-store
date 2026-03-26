from django.contrib import admin
from .models import Home,Sets,Tops,Bottoms,Cart,Cartitems,Orders,Profile,wishlist,wishlistItems, Checkout, OrderItem

# Register your models here.

admin.site.register(Home)
admin.site.register(Sets)
admin.site.register(Tops)
admin.site.register(Bottoms)
admin.site.register(Cart)
admin.site.register(Cartitems)
admin.site.register(Orders)
admin.site.register(Profile)
admin.site.register(wishlist)
admin.site.register(wishlistItems)
admin.site.register(Checkout)
admin.site.register(OrderItem)