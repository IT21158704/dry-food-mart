import express from 'express';
import { LoginValidator } from '../middlewares/LoggedIn.js';
import { createFavorite, createNewsFavorite, getFavorites, removeFavorite } from '../controllers/FavoriteController.js';

const favoruteRouter = express.Router();

favoruteRouter.post('/:id', LoginValidator, createFavorite);
favoruteRouter.post('/news/:id', LoginValidator, createNewsFavorite);
favoruteRouter.get('/', LoginValidator, getFavorites);
favoruteRouter.delete('/:id', removeFavorite);

export default favoruteRouter;