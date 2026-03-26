import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const {
    cartItems,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeCompletelyFromCart,
  } = useContext(CartContext);

  



  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Your Cart ({totalItems})
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mt: 4 }}>
          Your cart is empty.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {cartItems.map((item) => {
            const itemTotal = (item.product?.price || 0) * item.quantity;

            return (
              <Grid item xs={12} key={item.id}>
                <Paper elevation={2} sx={{ p: 2, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
                    <Box
                      component="img"
                      src={item.product?.image || ''}
                      alt={item.product?.name || 'Product'}
                      sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
                    />
                    <Box>
                      <Typography variant="h6">{item.product?.name || 'Unknown Product'}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.product?.description || ''}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                       {parseFloat(item.product?.price || 0).toFixed(2)}EGP
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: { xs: 0, sm: 2 } }}>
                    <IconButton onClick={() => decreaseCartQuantity(item.id)} size="small">
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {item.quantity}
                    </Typography>
                    <IconButton onClick={() => increaseCartQuantity(item.id)} size="small">
                      <AddIcon />
                    </IconButton>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: { xs: '100%', sm: 'auto' } }}>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                      {itemTotal.toFixed(2)}EGP
                    </Typography>
                    <IconButton
                      onClick={() => removeCompletelyFromCart(item.id)}
                      color="error"
                      sx={{ ml: 2 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}

      {cartItems.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Paper elevation={3} sx={{ p: 3, minWidth: 250 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Subtotal: {subtotal.toFixed(2)}EGP
            </Typography>
            <Button
              component={Link}
              to="/checkout"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
            >
              Proceed to Order
            </Button>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default Cart;