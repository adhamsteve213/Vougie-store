import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { useContext } from "react";
import { useAuth } from '../context/AuthContext';
import Button from "@mui/material/Button";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Grid from '@mui/material/Grid';
import { Link, useNavigate } from "react-router-dom";
export default function Home() {
    const [products, setProducts] = useState([]);
    
      const { cartItems, addToCart, increaseCartQuantity, decreaseCartQuantity } = useContext(CartContext);
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/home/')
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);

  const { token } = useAuth();
  const navigate = useNavigate();

  const handleFavoriteClick = (product, event) => {
    event.stopPropagation();
    if (!token) return navigate('/login');
    toggleWishlist(product, 'home');
  };


  return (
    <>
  
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Link to={`/product/home/${product.id}`} style={{ textDecoration: 'none' }}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.price}EGP
                </Typography>
                              {(() => {
                const cartItem = cartItems.find(cartItem => cartItem.product?.id === product.id);
                if (cartItem) {
                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                      <IconButton onClick={(event) => { event.stopPropagation(); decreaseCartQuantity(cartItem.id); }} size="small">
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body1" sx={{ mx: 1 }}>
                        {cartItem.quantity}
                      </Typography>
                      <IconButton onClick={(event) => { event.stopPropagation(); increaseCartQuantity(cartItem.id); }} size="small">
                        <AddIcon />
                      </IconButton>
                    </Box>
                  );
                } else {
                  return (
                    <Button onClick={(event) => { event.stopPropagation(); addToCart(product, 1, 'home'); navigate('/carts'); }} style={{ backgroundColor:'black',color:'white', padding:'10px',margin:'20px',borderRadius: '10px'}} sx={{ mt: 1 }}>
                      <ShoppingCartIcon />Add to Cart
                    </Button>
                  );
                }
              })()}
               <IconButton onClick={(event) => handleFavoriteClick(product, event)} sx={{ color: isInWishlist(product.id) ? 'red' : 'grey' }}>
                  <FavoriteBorderIcon />
                </IconButton>
              </CardContent>
            </CardActionArea>
          </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
    </>
  );
}
