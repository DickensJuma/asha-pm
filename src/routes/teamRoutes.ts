import express from 'express';
import {getAllTeams, createTeam, updateTeam} from '../controllers/teamController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Team router
router.get('/', getAllTeams);
router.post('/create', authMiddleware, createTeam);
router.put('/:id', authMiddleware, updateTeam);

export default router;
