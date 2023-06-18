import express from 'express';
import { registerUser,loginUser , getAllUsers, updateUser} from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.put('/:id', authMiddleware, updateUser);


export default router;
