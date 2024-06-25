import express from 'express';
import { createNews, getAllNewss, deleteNews, updateNews, getOne} from '../controllers/NewsController.js';

const newsRouter = express.Router();

newsRouter.post('/', createNews);
newsRouter.get('/', getAllNewss);
newsRouter.get('/:id', getOne);
newsRouter.delete('/:id', deleteNews);
newsRouter.put('/:id', updateNews);

export default newsRouter;
