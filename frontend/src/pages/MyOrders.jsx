import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAuth } from '../context/AuthContext';


const MyOrders = () => {
  const { token, getAuthHeaders } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
  const response = await fetch('http://127.0.0.1:8000/orders/', { headers: getAuthHeaders() });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          setError('Failed to fetch orders');
        }
      } catch (err) {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, getAuthHeaders]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          My Orders
        </Typography>
        <Typography align="center">Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          My Orders
        </Typography>
        <Typography color="error" align="center">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mt: 4 }}>
          You have no orders yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} key={order.id}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Typography variant="h6">
                        Order #{order.id}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        {parseFloat(order.total_amount).toFixed(2)}EGP
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body1" gutterBottom>
                        <strong>Shipping Information:</strong>
                      </Typography>
                      <Typography variant="body2">
                        Name: {order.first_name} {order.middle_name} {order.last_name}
                      </Typography>
                      <Typography variant="body2">
                        Phone: {order.phone_number}
                      </Typography>
                      <Typography variant="body2">
                        Address: {order.address}
                      </Typography>
                      <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                        <strong>Product Details:</strong>
                      </Typography>
                      {order.product ? (
                        <>
                          <Typography variant="body2">
                            Product: {order.product.name}
                          </Typography>
                          <Typography variant="body2">
                            Price: {order.product.price} EGP
                          </Typography>
                          <Typography variant="body2">
                            Description: {order.product.description}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="body2">Product details not available</Typography>
                      )}
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Ordered on: {new Date(order.created_at).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyOrders;