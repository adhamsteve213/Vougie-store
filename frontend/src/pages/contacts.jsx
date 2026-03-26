import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  IconButton,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function Contacts() {
  const handleInstagramOwner = () => {
    window.open('https://www.instagram.com/maldiniiixx/', '_blank');
  };

  const handleInstagramBrand = () => {
    window.open('https://www.instagram.com/vougi_eg/', '_blank');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/201099204026', '_blank');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Get in touch with us through our social media or WhatsApp.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Owner
            </Typography>
            <IconButton onClick={handleInstagramOwner} color="primary" size="large">
              <InstagramIcon fontSize="large" />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              @maldiniiixx
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Vougie EG
            </Typography>
            <IconButton onClick={handleInstagramBrand} color="primary" size="large">
              <InstagramIcon fontSize="large" />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              @vougi_eg
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              WhatsApp
            </Typography>
            <IconButton onClick={handleWhatsApp} color="success" size="large">
              <WhatsAppIcon fontSize="large" />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              +20 109 920 4026
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
