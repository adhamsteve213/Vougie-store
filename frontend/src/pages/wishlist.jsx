import React, { useContext } from 'react';

import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const {
    cartItems,
    addToCart,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useContext(CartContext);

  const handleAddToCart = (product) => {
    // Try to infer the category for this product by probing endpoints
    const findCategoryAndAdd = async () => {
      const categories = ['home', 'sets', 'tops', 'bottoms'];
      for (const cat of categories) {
        try {
          const res = await fetch(`http://127.0.0.1:8000/${cat}/${product.id}/`);
          if (res.ok) {
            addToCart(product, 1, cat);
            return;
          }
        } catch (err) {
          // ignore and try next
        }
      }
      console.error('Could not determine product category for adding to cart');
    };
    findCategoryAndAdd();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        My Wishlist
      </Typography>

      {wishlistItems.length === 0 ? (
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mt: 4 }}>
          Your wishlist is empty.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {wishlistItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Link to={`/product/${item.product?.category || ''}/${item.product?.id}`} style={{ textDecoration: 'none' }}>
                <Box
                  component="img"
                  src={item.product?.image || ''}
                  alt={item.product?.name || 'Product'}
                  sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 1, mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  {item.product?.name || 'Unknown Product'}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {item.product?.description || ''}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                  {parseFloat(item.product?.price || 0).toFixed(2)}EGP
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                  {(() => {
                    const cartItem = cartItems.find(cartItem => cartItem.product?.id === item.product?.id);
                    if (cartItem) {
                      return (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                          <IconButton onClick={() => decreaseCartQuantity(cartItem.id)} size="small">
                            <RemoveIcon />
                          </IconButton>
                          <Typography variant="body1" sx={{ mx: 1 }}>
                            {cartItem.quantity}
                          </Typography>
                          <IconButton onClick={() => increaseCartQuantity(cartItem.id)} size="small">
                            <AddIcon />
                          </IconButton>
                        </Box>
                      );
                    } else {
                      return (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<ShoppingCartIcon />}
                          onClick={() => handleAddToCart(item.product)}
                          fullWidth
                        >
                          Add to Cart
                        </Button>
                      );
                    }
                  })()}
                  <IconButton
                    color="error"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                </Link>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Wishlist;
