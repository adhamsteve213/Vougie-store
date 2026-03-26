from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

# Create your models here.

SIZES_CHOICES = (
    ('s', 's'),
    ('m', 'm'),
    ('l', 'l'),
    ('xl', 'xl'),
    ('xxl', 'xxl'),
    ('xxxl', 'xxxl'),
    ('none', 'No Size')
)

COLOR_CHOICES = (
    ('white', 'white'),
    ('black', 'black'),
    ('none', 'No Color'),
)

class Home(models.Model):
    name = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sizes = models.CharField(max_length=50, choices=SIZES_CHOICES)
    color = models.CharField(max_length=50, choices=COLOR_CHOICES, default='none', blank=True)
    image = models.ImageField(upload_to='product_images/')
    description = models.TextField()
    stock = models.PositiveIntegerField(default=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
class Sets(models.Model):
    name = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sizes = models.CharField(max_length=50, choices=SIZES_CHOICES)
    image = models.ImageField(upload_to='product_images/')
    description = models.TextField()
    stock = models.PositiveIntegerField(default=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
class Tops(models.Model):
    name = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sizes = models.CharField(max_length=50, choices=SIZES_CHOICES)
    color = models.CharField(max_length=50, choices=COLOR_CHOICES, default='none', blank=True)
    image = models.ImageField(upload_to='product_images/')
    description = models.TextField()
    stock = models.PositiveIntegerField(default=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Bottoms(models.Model):
    name = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sizes = models.CharField(max_length=50, choices=SIZES_CHOICES)
    image = models.ImageField(upload_to='product_images/')
    description = models.TextField()
    stock = models.PositiveIntegerField(default=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    home = models.ManyToManyField(Home, blank=True)
    sets = models.ManyToManyField(Sets, blank=True)
    tops = models.ManyToManyField(Tops, blank=True)
    bottoms = models.ManyToManyField(Bottoms, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart for {self.user.username}"

class Cartitems(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, default=1)
    object_id = models.PositiveIntegerField(default=1)
    product = GenericForeignKey('content_type', 'object_id')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantity} of {self.product.name}"

class Checkout(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)
    address = models.CharField(max_length=5000)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Checkout {self.id} for {self.user.username}"

class Orders(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders')
    checkout = models.OneToOneField(Checkout, on_delete=models.CASCADE, related_name='order', null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(max_length=50, default='Pending')

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Orders, on_delete=models.CASCADE, related_name='items')
    quantity = models.PositiveIntegerField(default=1)
  
    # GenericForeignKey fields
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, default=1)
    object_id = models.PositiveIntegerField(default=1)
    content_object = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        # Accessing a common field like 'name' on the related product
        return f'{self.quantity} of {getattr(self.content_object, "name", "N/A")}'

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    role = models.CharField(max_length=50, default='user', choices=[('user', 'User'), ('admin', 'Admin')])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.user.username

class wishlist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    home = models.ManyToManyField(Home, blank=True)
    sets = models.ManyToManyField(Sets, blank=True)
    tops = models.ManyToManyField(Tops, blank=True)
    bottoms = models.ManyToManyField(Bottoms, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"Wishlist for {self.user.username}"

class wishlistItems(models.Model):
    wishlist = models.ForeignKey(wishlist, related_name='items', on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, default=1)
    object_id = models.PositiveIntegerField(default=1)
    product = GenericForeignKey('content_type', 'object_id')
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} in {self.wishlist.user.username}'s wishlist"
