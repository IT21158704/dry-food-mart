import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Favorite } from '@material-ui/icons';
import { IconButton } from '@mui/material';
import { useAuth } from '../pages/common/AuthContext';

export default function MediaCard() {
  const { userRole } = useAuth();
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (userRole === 'customer') {
      navigate('/customer/itempage'); }
      else {
        navigate('/itempage');
      }
  };

  return (
    <Card sx={{ maxWidth: 200 }} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <CardMedia
        sx={{ height: 100 }}
        image="https://images.unsplash.com/photo-1559622214-f8a9850965bb?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Product
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </Typography>
        {userRole === 'customer' && (
          <div disableSpacing className='text-right'>
            <IconButton aria-label="add to favorites">
              <Favorite />
            </IconButton>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
