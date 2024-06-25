import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


export default function WelcomeCardInventory() {

  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const [firstName, setFirstName]= useState('Loading');
  
  
  const cardStyle = {
      minWidth: 250,
      background: 'linear-gradient(to bottom right, #293660, rgba(0, 0, 0, 0)), url(https://th.bing.com/th/id/R.f8e7cdcf9f230faeb0824b8db3273b9a?rik=LNMVumAsA7HO%2fg&pid=ImgRaw&r=0) top right no-repeat',
      backgroundSize: 'cover',
      position: 'relative',
    };
  
    return (
      <Card sx={cardStyle} className='mb-3'>
        <CardContent className='text-white'>
          <Typography variant='h5' gutterBottom>
            Welcome,
          </Typography>
          <Typography variant="subtitle1" component="div">
              Inventory Dashboard
          </Typography>
  
          {currentTime.toUTCString()}
          
     
          
        </CardContent>
        <CardActions>
          {/* <Button size="small" onClick={()=>  logout()} sx={{color:'white'}}>Log out </Button> */}
        </CardActions>
      </Card>
  );
}
