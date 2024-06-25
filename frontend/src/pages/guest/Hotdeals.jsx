import React from 'react'
import MainFeaturedPost from '../../components/HotDeals/MainFeaturedPost'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Hotdeals() {

  return (
    <div>
      <MainFeaturedPost />
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#9ca3af' }}>
        Active Offers
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Card sx={{ minWidth: 275, marginRight: 5 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Friday Offer
            </Typography>
            <Typography variant="h5" component="div">
              Get 10% discount
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <Card sx={{ minWidth: 275, marginRight: 5 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Friday Offer
            </Typography>
            <Typography variant="h5" component="div">
              Get 10% discount
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  )
}
