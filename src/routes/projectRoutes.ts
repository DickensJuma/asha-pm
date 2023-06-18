// src/routes.js

import express from 'express';
import {getAllProjects, createProject, updateProject}from '../controllers/projectController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Project routes
router.get('/', getAllProjects);
router.post('/create', authMiddleware, createProject);
router.put('/:id', authMiddleware, updateProject);

export default router;
