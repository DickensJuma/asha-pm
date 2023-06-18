import { Request, Response } from 'express';
import  Project  from '../models/project';
import ProjectService from '../services/projectService';


// GET /projects
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

// POST /projects
async function createProject(req: Request, res: Response) {

  try {
    const project: Project = await ProjectService.createProject(req.body);
    res.status(201).json({ results: { message: 'Project created successfully', project } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// PUT /projects/:id
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

export { getAllProjects, createProject, updateProject };
