import express from 'express';
import { createSalary, getAllSalaries, getOneSalary, deleteSalary, updateSalary } from '../controllers/SalaryController.js';

const salaryRouter = express.Router();

salaryRouter.post('/', createSalary);
salaryRouter.get('/', getAllSalaries);
salaryRouter.get('/:id', getOneSalary);
salaryRouter.delete('/:id', deleteSalary);
salaryRouter.put('/:id', updateSalary);

export default salaryRouter;
