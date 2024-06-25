import express from 'express';
import { createProduct, getAllProducts, deleteProduct, updateProduct, getOne} from '../controllers/ItemController.js';

const productRouter = express.Router();

productRouter.post('/create-product', createProduct);
productRouter.get('/all-products', getAllProducts);
productRouter.get('/get-one/:id', getOne);
productRouter.delete('/delete-product/:id', deleteProduct);
productRouter.put('/update-product/:id', updateProduct);

export default productRouter;