import express from 'express';
import { LoginValidator } from '../middlewares/LoggedIn.js';
import { createReview, getReviews, removeReview, updateReview, createDriverRate, getRateByDriver, createProductReview, getProductReviews, updateProductReview, removeProductReview } from '../controllers/ReviewController.js';

const reviewRouter = express.Router();

reviewRouter.post('/', LoginValidator, createReview );
reviewRouter.get('/', getReviews );
reviewRouter.post('/driver', LoginValidator, createDriverRate );
reviewRouter.get('/driver', LoginValidator, getRateByDriver );
reviewRouter.delete('/:id', removeReview );
reviewRouter.put('/:id', updateReview);

reviewRouter.post('/product', LoginValidator, createProductReview );
reviewRouter.get('/product/:id',  getProductReviews );
reviewRouter.delete('/product/:id', removeProductReview );
reviewRouter.put('/product/:id', updateProductReview);

export default reviewRouter;