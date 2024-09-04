import express from 'express';
import * as employeeController from '../controllers/employeeController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', verifyToken, employeeController.createEmployee);
router.put('/:id', verifyToken, employeeController.updateEmployee);
router.delete('/:id', verifyToken, employeeController.deleteEmployee);
router.get('/', verifyToken, employeeController.getAllEmployees);
router.get('/:id', verifyToken, employeeController.getEmployee);

export default router;
