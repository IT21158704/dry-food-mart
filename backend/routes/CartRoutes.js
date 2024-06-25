import express from 'express';
import { createCart, getCart, removeCart, removeAllCart } from '../controllers/CartController.js';
import { LoginValidator } from '../middlewares/LoggedIn.js';

const cartRouter = express.Router();

cartRouter.post('/:id', LoginValidator, createCart );
cartRouter.get('/', LoginValidator, getCart );
cartRouter.delete('/:id', removeCart );
cartRouter.delete('/', LoginValidator, removeAllCart );

export default cartRouter;