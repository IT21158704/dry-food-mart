import express from 'express';
import { createSupplier, deleteSupplier, getAllSupplierss, getOne, updateSupplier, createOrder, getAllOrders  } from '../controllers/SupplierController.js';



const supplierRouter = express.Router();

supplierRouter.post('/', createSupplier);
supplierRouter.post('/order', createOrder);
supplierRouter.get('/order', getAllOrders);
supplierRouter.get('/', getAllSupplierss);
supplierRouter.get('/:id', getOne);
supplierRouter.delete('/:id', deleteSupplier);
supplierRouter.put('/:id', updateSupplier);

export default supplierRouter;