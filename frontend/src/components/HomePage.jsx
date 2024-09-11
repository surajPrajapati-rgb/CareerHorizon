import React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import railImg from '../assets/rail_img.jpg';
import tourImg from '../assets/tourism_img.jpg';

function HomePage() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        height: '100vh',
        backgroundColor: '#8ea2fa',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid item xs={12} sm={6} md={4} container alignItems="center" justifyContent="center">
        <Card sx={{ width: 300, height: 250 }}>
          <CardMedia
            component="img"
            alt="Description of the image"
            height="150" // Adjust height as needed
            image={railImg} // URL or path to your image
          />
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h5" component="div">
              Railway Navigation
            </Typography>
            <Link to="/rail-navigation" style={{ textDecoration: 'none' }}>
              <Typography variant="body1" color="primary">Go to Rail Navigation</Typography>
            </Link>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4} container alignItems="center" justifyContent="center">
        <Card sx={{ width: 300, height: 250 }}>
          <CardMedia
            component="img"
            alt="Description of the image"
            height="150" // Adjust height as needed
            image={tourImg} // URL or path to your image
          />
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h5" component="div">
              Tourism Navigation
            </Typography>
            <Link to="/tourism-navigation" style={{ textDecoration: 'none' }}>
              <Typography variant="body1" color="primary">Go to Tourism Navigation</Typography>
            </Link>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4} container alignItems="center" justifyContent="center">
        <Card sx={{ width: 300, height: 250 }}>
          <CardMedia
            component="img"
            alt="Description of the image"
            height="150" // Adjust height as needed
            image={railImg} // URL or path to your image
          />
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h5" component="div">
              Other Navigation
            </Typography>
            <Link to="/other-navigation" style={{ textDecoration: 'none' }}>
              <Typography variant="body1" color="primary">Go to Other Navigation</Typography>
            </Link>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default HomePage;
