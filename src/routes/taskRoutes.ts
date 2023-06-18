
import express from 'express';  
import { getAllTasks, getTaskById, createTask, updateTask, getSummary } from '../controllers/taskController';
import authMiddleware from '../middlewares/authMiddleware';


const router= express.Router();


// Task routes
router.get('/', getAllTasks);
router.get('/:task_id', getTaskById);
router.post('/create',  createTask);
router.put('/:task_id',  updateTask);

router.get('/summary/report', getSummary);
export default router;
