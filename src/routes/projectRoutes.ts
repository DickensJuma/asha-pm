// src/routes.js

import express from 'express';
import {getAllProjects, createProject, updateProject}from '../controllers/projectController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Project routes
router.get('/', getAllProjects);
router.get('/:project_id', getAllProjects);
router.put('/:project_id',  updateProject);
router.post('/create', createProject);
router.delete('/:project_id', updateProject);


export default router;
