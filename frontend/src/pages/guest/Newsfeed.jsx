import React, { useState, useEffect } from 'react'
import MainFeaturedPost from '../../components/NewsFeed/MainFeaturedPost';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../common/AuthContext';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import { IconButton } from '@mui/material';
import { Favorite } from '@material-ui/icons';
import { toast } from 'react-toastify';

export default function Newsfeed() {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const getNews = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/news`);
      setNews(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('Products not found');
      } else {
        toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  const getFav = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/favorite`);
      setFavorites(res.data.favoritesData);
      console.log(res) // Directly set favorites to the array of favorites
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('Products not found');
      } else {
        toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  const manageFavorite = async (newsId) => {
    try {
      // Check if the news is already favorited
      const isFavorite = isInFavorites(newsId);
      if (isFavorite) {
        // If already favorited, find the favorite entry and remove it from favorites
        const favoriteEntry = favorites.find(fav => fav.newsId === newsId);
        const result = await authAxios.delete(`${apiUrl}/favorite/${favoriteEntry._id}`);
        if (result) {
          toast.success("Removed from favorites");
          getFav();
          getNews();
        }
      } else {
        // If not favorited, add it to favorites
        const result = await authAxios.post(`${apiUrl}/favorite/news/${newsId}`);
        if (result) {
          toast.success("Added to favorites");
          getFav();
          getNews();
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const isInFavorites = (newsId) => {
    return favorites.some(fav => fav.newsId === newsId);
  };

  useEffect(() => {
    getFav();
    getNews();
  }, []);

  return (
    <div>
      <MainFeaturedPost />
      <div className="mt-7">
        <Typography variant="h4" className="text-center">
          {' '}
          Favorites{' '}
        </Typography>
        <Grid container direction="row" spacing={2} marginTop={1}>
          {news
            .filter((review) => isInFavorites(review._id))
            .map((review) => (
              <Grid item xs={12} md={6} key={review._id}>
                <CardActionArea component="a" onClick={() => navigate(`/news/${review._id}`)}>
                  <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                      <Typography component="h2" variant="h5">
                        {review.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {review.updatedAt}
                      </Typography>
                      <Typography variant="subtitle1" paragraph>
                        {review.description}
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                        Continue reading...
                      </Typography>
                      {userRole === 'customer' && (
                        <div onClick={(e) => { e.stopPropagation(); manageFavorite(review._id) }}>
                          <IconButton aria-label="add to favorites">
                            <Favorite style={{ color: isInFavorites(review._id) ? 'red' : 'black' }} />
                          </IconButton>
                        </div>
                      )}
                    </CardContent>
                    <CardMedia
                      component="img"
                      sx={{ height: 205, width: 180, display: { xs: 'none', sm: 'block' } }}
                      image={review.img}
                      alt={review.title}
                    />
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
        </Grid>
      </div>

      <div className='mt-7'>
        <Typography variant='h4' className='text-center'> Latest </Typography>
        <Grid container direction="row" spacing={2} marginTop={1}>
          {news.filter(review => review.status !== 'pending').map((review) => (
            <Grid item xs={12} md={6}>
              <CardActionArea component="a" onClick={() => navigate(`/news/${review._id}`)} >
                <Card sx={{ display: 'flex' }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                      {review.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {review.updatedAt}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      {review.description}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      Continue reading...
                    </Typography>
                    {userRole === 'customer' && (
                      <div onClick={(e) => { e.stopPropagation(); manageFavorite(review._id) }}>
                        <IconButton aria-label="add to favorites">
                          <Favorite style={{ color: isInFavorites(review._id) ? 'red' : 'black' }} />
                        </IconButton>
                      </div>
                    )}
                  </CardContent>
                  <CardMedia
                    component="img"
                    sx={{ height: 205, width: 180, display: { xs: 'none', sm: 'block' } }}
                    image={review.img}
                    alt={review.title}
                  />
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}
