import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import  { useContext } from "react";
import { useAuth } from '../context/AuthContext';
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function ProductDetails() {
    const { category, id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
      const { cartItems, addToCart, increaseCartQuantity, decreaseCartQuantity } = useContext(CartContext);
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/${category}/${id}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [category, id]);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;
    if (!product) return <Typography>Product not found</Typography>;
    const handleFavoriteClick = (product, event) => {
    event.stopPropagation();
    if (!token) return navigate('/login');
    toggleWishlist(product, category);
  };

  const handleAddToCartClick = (product, event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!token) return navigate('/login');

    // require selecting size/color when available
    if (product.sizes && product.sizes !== 'none' && !selectedSize) {
      setError('Please select a size');
      return;
    }
    if (product.color && product.color !== 'none' && !selectedColor) {
      setError('Please select a color');
      return;
    }

    addToCart(product, 1, category);
  };

    return (
        <Box sx={{ padding: 4, maxWidth: 1200, margin: 'auto' }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <CardMedia
                        component="img"
                        height="500"
                        image={product.image}
                        alt={product.name}
                        sx={{ objectFit: 'cover', borderRadius: 2 }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                        <Typography gutterBottom variant="h4" component="div">
                            {product.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            {product.description}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                            {product.price} EGP
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Stock: {product.stock}
                        </Typography>
            {product.sizes && product.sizes !== 'none' && (
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Select size:</Typography>
                <select value={selectedSize || ''} onChange={(e) => setSelectedSize(e.target.value)}>
                  <option value="">Choose size</option>
                  <option value="s">s</option>
                  <option value="m">m</option>
                  <option value="l">l</option>
                  <option value="xl">xl</option>
                  <option value="xxl">xxl</option>
                  <option value="xxxl">xxxl</option>
                </select>
              </Box>
            )}
            {product.color && product.color !== 'none' && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Select color:</Typography>
                <select value={selectedColor || ''} onChange={(e) => setSelectedColor(e.target.value)}>
                  <option value="">Choose color</option>
                  <option value="white">white</option>
                  <option value="black">black</option>
                </select>
              </Box>
            )}
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item>
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
                    <Button onClick={(event) => handleAddToCartClick(product, event)} style={{ backgroundColor:'black',color:'white', padding:'10px',margin:'20px',borderRadius: '10px'}} sx={{ mt: 1 }}>
                      <ShoppingCartIcon/> Add to Cart
                    </Button>
                  );
                }
              })()}
                            </Grid>
                            <Grid item>
                                <IconButton onClick={(event) => handleFavoriteClick(product, event)} sx={{ color: isInWishlist(product.id) ? 'red' : 'grey' }}>
                  <FavoriteBorderIcon />
                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
