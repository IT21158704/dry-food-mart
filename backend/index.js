import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv'
import { dbConfig } from './utils/dbConfig.js';
import cors from 'cors';
import userRouter from './routes/UserRoutes.js';
import itemRouter from './routes/ItemRoutes.js';
import favoruteRouter from './routes/FavoriteRoutes.js';
import cartRouter from './routes/CartRoutes.js';
import orderRouter from './routes/OrderRoutes.js';
import reviewRouter from './routes/ReviewRoutes.js';
import newsRouter from './routes/NewsRoutes.js';
import addressRouter from './routes/AddressRoutes.js';
import supplierRouter from './routes/SupplierRoutes.js';
import salaryRouter from './routes/SalaryRoutes.js';

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
dotenv.config();

app.use(morgan('dev'));
app.use(cors());
app.get('/', async (req,res)=>{
    res.status(200).json('Server is up and running');
})

//Admin Routes
app.use('/user', userRouter);
//Item Routes
app.use('/item', itemRouter);
//favorite Routes
app.use('/favorite', favoruteRouter);
//cart Routes
app.use('/cart', cartRouter);
//order Routes
app.use('/order', orderRouter);
//review Routes
app.use('/review', reviewRouter);
//news Routes
app.use('/news', newsRouter);
//address Routes
app.use('/address', addressRouter);
//supplier Routes
app.use('/supplier', supplierRouter);
//salary Routes
app.use('/salary', salaryRouter);

dbConfig().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is up and running on port ${port}`);
    })
}).catch((err)=>{
    console.log(err);
})

