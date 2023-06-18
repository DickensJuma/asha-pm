import express from 'express';
import { registerUser,loginUser , getAllUsers, updateUser, deleteUser,  getUserById} from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.get('/:user_id', getUserById);
router.put('/:user_id', updateUser);
router.delete('/:user_id', deleteUser);


export default router;
