import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function About() {
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          About Vougie
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Bringing Global Fashion to Egypt with Style and Affordability
        </Typography>
      </Box>

      {/* Our Story */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="body1" paragraph>
          Founded in the heart of Cairo, Vougie emerged from a passion for fashion and a desire to make high-quality clothing accessible to everyone in Egypt. What started as a small boutique in 2020 has grown into a beloved local brand, specializing in meticulously crafted replicas of global fashion icons.
        </Typography>
        <Typography variant="body1" paragraph>
          Our founder, inspired by the vibrant streets of Egypt and the global fashion scene, recognized the need for affordable, stylish clothing that captures the essence of international brands. With a team of dedicated artisans and designers, we bring you pieces that mirror the latest trends from around the world, all while supporting local craftsmanship and economy.
        </Typography>
        <Typography variant="body1">
          At Vougie, we believe that fashion should be inclusive, fun, and within reach. Every piece tells a story of Egyptian innovation meeting global style.
        </Typography>
      </Paper>

      {/* Mission and Vision */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="h3" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1">
                To democratize fashion in Egypt by providing high-quality, affordable clothing that empowers our customers to express their unique style, while fostering local craftsmanship and sustainable practices.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="h3" gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body1">
                To become Egypt's leading fashion destination, where every customer finds their perfect style match, and where local talent shines on the global stage through innovative design and ethical production.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Why Choose Vougie */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Why Choose Vougie?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <LocalShippingIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Fast Delivery
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quick and reliable shipping across Egypt, ensuring your fashion arrives when you need it.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <SecurityIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Quality Assurance
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Every piece undergoes rigorous quality checks to ensure durability and comfort.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <ThumbUpIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Customer Satisfaction
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your happiness is our priority. We're here to make your shopping experience exceptional.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Contact Section */}
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Get in Touch
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Follow us on social media or reach out via WhatsApp for the latest updates and exclusive offers.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <IconButton onClick={handleInstagramOwner} color="primary" size="large">
            <InstagramIcon fontSize="large" />
          </IconButton>
          <Typography variant="body2" sx={{ alignSelf: 'center' }}>
            Owner: @maldiniiixx
          </Typography>
          <IconButton onClick={handleInstagramBrand} color="primary" size="large">
            <InstagramIcon fontSize="large" />
          </IconButton>
          <Typography variant="body2" sx={{ alignSelf: 'center' }}>
            Brand: @vougi_eg
          </Typography>
          <IconButton onClick={handleWhatsApp} color="success" size="large">
            <WhatsAppIcon fontSize="large" />
          </IconButton>
          <Typography variant="body2" sx={{ alignSelf: 'center' }}>
            +20 109 920 4026
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
