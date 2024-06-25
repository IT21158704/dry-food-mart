import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import authAxios from '../../utils/authAxios';
import Loader from '../../components/Loader/Loader';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Favorite } from '@material-ui/icons';
import { IconButton } from '@mui/material';
import { useAuth } from '../common/AuthContext';

export default function Items() {

  const [snacks, setSnacks] = useState([]);
  const [bakery, setBakery] = useState([]);
  const [sweets, setsweets] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userRole } = useAuth();
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    if (userRole === 'customer') {
      navigate(`/customer/itempage/${id}`);
    }
    else {
      navigate(`/itempage/${id}`);
    }
  };

  const getItems = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/item/all-products`);

      res.data.forEach(item => {
        if (allItems.length < 4 && allItems.length < res.data.length) {
          allItems.push(item);
        }
      });

      // Categorize each item
      res.data.forEach(item => {
        if (item.category === 'Snacks') {
          if (sweets.length < 4) {
            snacks.push(item);
          }
        } else if (item.category === 'Bakery') {
          if (bakery.length < 4) {
            bakery.push(item);
          }
        } else if (item.category === 'Sweets') {
          if (sweets.length < 4) {
            sweets.push(item);
          }
        }
      });

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('Products not found');
      } else {
        toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  const manageFavorite = async (itemId) => {
    try {
      // Check if the item is already favorited
      const isFavorite = isInFavorites(itemId);
      if (isFavorite) {
        // If already favorited, find the favorite entry and remove it from favorites
        const favoriteEntry = favorites.find(fav => fav.itemId === itemId);
        const result = await authAxios.delete(`${apiUrl}/favorite/${favoriteEntry._id}`);
        if (result) {
          toast.success("Removed from favorites");
          getFav();
        }
      } else {
        // If not favorited, add it to favorites
        const result = await authAxios.post(`${apiUrl}/favorite/${itemId}`);
        if (result) {
          toast.success("Added to favorites");
          getFav();
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  

  // Adjust the getFav function to directly set the favorites state to the array of favorites
  const getFav = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/favorite`);
      setFavorites(res.data.favoritesData); // Directly set favorites to the array of favorites
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('Products not found');
      } else {
        toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  // Modify the isInFavorites function to correctly check if the item is in favorites
  const isInFavorites = (itemId) => {
    return favorites.some(fav => fav.itemId === itemId);
  };


  useEffect(() => {
    getItems();
    getFav();
  }, []);

  return (
    <div>
      {
        !isLoading ? <>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#9ca3af' }}>
            Latest Products
          </Typography>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {allItems.map((row, index) => (
              <div key={index} style={{ margin: '10px', display: 'flex', flexDirection: 'column' }}>
                <Card sx={{ width: 200, height: 200 }} style={{ cursor: 'pointer' }}>
                  <div onClick={() => handleCardClick(row._id)} style={{ flex: 1 }}>
                    <CardMedia
                      sx={{ height: 100 }}
                      image={row.img}
                      title={row.itemName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {row.itemName}
                      </Typography>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Rs. {row.price}.00
                        </Typography>
                        {userRole === 'customer' && (
                          <div onClick={(e) => { e.stopPropagation(); manageFavorite(row._id) }}>
                            <IconButton aria-label="add to favorites">
                              <Favorite style={{ color: isInFavorites(row._id) ? 'red' : 'black' }} />
                            </IconButton>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#9ca3af' }}>
            Snacks
          </Typography>

          {/* Container for MediaCard components */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Render MediaCard components */}
            {snacks.map((row, index) => (
              <div key={index} style={{ margin: '10px', display: 'flex', flexDirection: 'column' }}>
                <Card sx={{ width: 200, height: 200 }} style={{ cursor: 'pointer' }}>
                  <div onClick={() => handleCardClick(row._id)} style={{ flex: 1 }}>
                    <CardMedia
                      sx={{ height: 100 }}
                      image={row.img}
                      title={row.itemName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {row.itemName}
                      </Typography>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Rs. {row.price}.00
                        </Typography>
                        {userRole === 'customer' && (
                          <div onClick={(e) => { e.stopPropagation(); manageFavorite(row._id) }}>
                            <IconButton aria-label="add to favorites">
                              <Favorite style={{ color: isInFavorites(row._id) ? 'red' : 'black' }} />
                            </IconButton>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#9ca3af' }}>
            Bakery
          </Typography>

          {/* Container for MediaCard components */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Render MediaCard components */}
            {bakery.map((row, index) => (
              <div key={index} style={{ margin: '10px', display: 'flex', flexDirection: 'column' }}>
                <Card sx={{ width: 200, height: 200 }} style={{ cursor: 'pointer' }}>
                  <div onClick={() => handleCardClick(row._id)} style={{ flex: 1 }}>
                    <CardMedia
                      sx={{ height: 100 }}
                      image={row.img}
                      title={row.itemName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {row.itemName}
                      </Typography>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Rs. {row.price}.00
                        </Typography>
                        {userRole === 'customer' && (
                          <div onClick={(e) => { e.stopPropagation(); manageFavorite(row._id) }}>
                            <IconButton aria-label="add to favorites">
                              <Favorite style={{ color: isInFavorites(row._id) ? 'red' : 'black' }} />
                            </IconButton>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#9ca3af' }}>
            Sweets
          </Typography>

          {/* Container for MediaCard components */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Render MediaCard components */}
            {sweets.map((row, index) => (
              <div key={index} style={{ margin: '10px', display: 'flex', flexDirection: 'column' }}>
                <Card sx={{ width: 200, height: 200 }} style={{ cursor: 'pointer' }}>
                  <div onClick={() => handleCardClick(row._id)} style={{ flex: 1 }}>
                    <CardMedia
                      sx={{ height: 100 }}
                      image={row.img}
                      title={row.itemName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {row.itemName}
                      </Typography>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Rs. {row.price}.00
                        </Typography>
                        {userRole === 'customer' && (
                          <div onClick={(e) => { e.stopPropagation(); manageFavorite(row._id) }}>
                            <IconButton aria-label="add to favorites">
                              <Favorite style={{ color: isInFavorites(row._id) ? 'red' : 'black' }} />
                            </IconButton>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </> : <Loader />}
    </div>
  )
}
