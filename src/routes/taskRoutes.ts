
import express from 'express';  
import { getAllTasks, getTaskById, createTask, updateTask, getSummary } from '../controllers/taskController';
import authMiddleware from '../middlewares/authMiddleware';


const router= express.Router();


// Task routes
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.get('/summary', getSummary);
router.post('/create', authMiddleware, createTask);
router.put('/:id', authMiddleware, updateTask);

export default router;
