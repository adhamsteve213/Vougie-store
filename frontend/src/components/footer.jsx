import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function Footer() {
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
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        p: 3,
        mt: 'auto',
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <Typography variant="body1" align="center">
            Contact Us
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={handleInstagramOwner} color="inherit" size="small">
            <InstagramIcon />
          </IconButton>
          <Typography variant="caption" display="inline" sx={{ ml: 1 }}>
            Owner
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={handleInstagramBrand} color="inherit" size="small">
            <InstagramIcon />
          </IconButton>
          <Typography variant="caption" display="inline" sx={{ ml: 1 }}>
            Vougie EG
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={handleWhatsApp} color="inherit" size="small">
            <WhatsAppIcon />
          </IconButton>
          <Typography variant="caption" display="inline" sx={{ ml: 1 }}>
            WhatsApp
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        © 2023 Vougie. All rights reserved.
      </Typography>
    </Box>
  );
}
