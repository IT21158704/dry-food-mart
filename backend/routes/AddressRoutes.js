import express from 'express';
import { createAddress, getAddress, removeAddress, updateAddress } from '../controllers/AddressController.js';
import { LoginValidator } from '../middlewares/LoggedIn.js';

const addressRouter = express.Router();

addressRouter.post('/', LoginValidator, createAddress );
addressRouter.get('/', LoginValidator, getAddress );
addressRouter.delete('/:id', removeAddress );
addressRouter.put('/:id', updateAddress );

export default addressRouter;