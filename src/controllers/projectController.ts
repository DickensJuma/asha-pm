import { Request, Response } from 'express';
import  Project  from '../models/project';
import ProjectService from '../services/projectService';


// GET /projects

/**
 * @swagger
 * /api/v1/projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Retrieve a list of projects
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: number
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: number
 *     description: Retrieve a list of projects from the database
 *     responses:
 *       200:
 *         description: Successful response
 */
async function getAllProjects(req: Request, res: Response) {
  // Pagination
  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number = parseInt(req.query.perPage as string) || 10;

  const startIndex: number = (page - 1) * limit;
  const endIndex: number = page * limit;

  const results: { results: Project[]; next?: { page: number; limit: number } } = {
    results: []
  };

  try {
    const projects: Project[] = await ProjectService.getAllProjects();

    if (endIndex < projects.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    results.results = projects.slice(startIndex, endIndex);
    res.status(200).json(results);
  } catch (error) {
    console.log('ALL PROJECT ERR', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// GET /projects/:id
/**
  * @swagger
  * /api/v1/projects/{project_id}:
  *   get:
  *     tags:
  *       - Projects
  *     description: Get Project
  *     operationId: getProjectById
  *     summary: Get Project
  *     security:
  *       - ApiKeyAuth: []
  *     parameters:
  *       - name: project_id
  *         in: path
  *         required: true
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Information fetched succussfuly
  *       400:
  *         description: Invalid request
  */

async function getProjectById(req: Request, res: Response) {


  const projectId: number = parseInt(req.params.id)

  try {
    const project: Project | null = await ProjectService.getProjectById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ results: project });

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });

  }
}

// POST /projects/create

/**
  * @swagger
  * /api/v1/projects/create:
  *   post:
  *     tags:
  *       - Projects
  *     description:  Create a new project
  *     operationId: createProject
  *     summary: 
  *     security:
  *       - ApiKeyAuth: []
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             example:  { "name": "Project 1", "description": "Project 1 description", "tasks": [ "97a31e06-0af6-11ee-be56-0242ac120002", "97a3207c-0af6-11ee-be56-0242ac120002" ]}
  *     responses:
  *       200:
  *         description: Information fetched succussfuly
  *       400:
  *         description: Invalid request
  */

async function createProject(req: Request, res: Response) {

  try {
    const project: Project = await ProjectService.createProject(req.body);
    res.status(201).json({ results: { message: 'Project created successfully', project } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// PUT /projects/:id


/** @swagger
  * /api/v1/projects/{project_id}:
  *   put:
  *     tags:
  *       - Projects
  *     description: Update Project
  *     operationId: updateProject
  *     summary: update Project
  *     parameters:
  *       - name: project_id
  *         in: path
  *         required: true
  *         schema:
  *           type: string
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             example: { "name": "Project 1", "description": "Project 1 description",  "tasks": [ "97a31e06-0af6-11ee-be56-0242ac120002", "97a3207c-0af6-11ee-be56-0242ac120002" ]}  
  *     responses:
  *       200:
  *         description: Information fetched succussfully
  *       400:
  *         description: Invalid request
  */
async function updateProject(req: Request, res: Response) {
  const projectId: number = parseInt(req.params.id)

  try {
    const project: Project | null = await ProjectService.updateProject(projectId, req.body);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }



    res.status(200).json({ results: { message: 'Project updated successfully', project } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// DELETE /projects/:id

/**
  * @swagger
  * /api/v1/projects/{project_id}:
  *   delete:
  *     tags:
  *       - Projects
  *     description: Delete Project
  *     operationId: deleteProject
  *     summary: Delete Project
  *     security:
  *       - ApiKeyAuth: []
  *     parameters:
  *       - name: project_id
  *         in: path
  *         required: true
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Information fetched succussfuly
  *       400:
  *         description: Invalid request
  */
async function deleteProject(req: Request, res: Response) {
  const projectId: number = parseInt(req.params.id)

  try {
    const project: Project | null = await ProjectService.deleteProject(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ results: { message: 'Project deleted successfully', project } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });


  }

}




export { getAllProjects, createProject, updateProject , deleteProject, getProjectById};
