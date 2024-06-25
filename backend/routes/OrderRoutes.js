import express from 'express';

import { LoginValidator } from '../middlewares/LoggedIn.js';
import { createOrder, deleteOrder, getAllOrders, getallByUser, updateOrder, getByDriver } from '../controllers/OrderController.js';

const orderRouter = express.Router();

orderRouter.post('/', LoginValidator, createOrder );
orderRouter.get('/all', getAllOrders );
orderRouter.get('/', LoginValidator, getallByUser );
orderRouter.get('/driver', LoginValidator, getByDriver );
orderRouter.delete('/:id', deleteOrder );
orderRouter.put('/:id', updateOrder );

export default orderRouter;