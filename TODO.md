# TODO List for Fixing Add to Cart and Wishlist Functionality

## Testing
8. Test adding to cart and wishlist for authenticated users.
9. Test navigation to cart on add, quantity change, checkout to MyOrders.
10. Ensure buttons are hidden for unauthenticated users.

## Completed Tasks
- [x] Backend Changes: Updated models.py with GenericForeignKey for Cartitems and wishlistItems.
- [x] Backend Changes: Updated models.py with GenericForeignKey for Orders and OrderItem.
- [x] Backend Changes: Updated serializers.py for CartitemsSerializer and wishlistItemsSerializer.
- [x] Backend Changes: Updated serializers.py for OrdersSerializer and OrderItemSerializer.
- [x] Backend Changes: Updated views.py with create methods for CartitemsViewSet and wishlistItemsViewSet.
- [x] Backend Changes: Updated checkout view to handle GenericForeignKey.
- [x] Frontend Changes: Updated CartContext.jsx addToCart function.
- [x] Frontend Changes: Updated WishlistContext.jsx addToWishlist function.
- [x] Frontend Changes: Updated sets.jsx, tops.jsx, bottoms.jsx, home.jsx, ProductDetails.jsx to pass category.
- [x] Frontend Changes: Hide add to cart button and wishlist icon if user is not authenticated.
