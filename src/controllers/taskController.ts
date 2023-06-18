import { Request, Response } from 'express';
import Task from '../models/task';
import TaskService from '../services/taskService';

// GET /tasks
export async function getAllTasks(req: Request, res: Response): Promise<void> {
  // Pagination
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.perPage as string) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results: { next?: { page: number; limit: number }; results: Task[] } = {
    results: []
  };

  try {
    const tasks = await TaskService.getAllTasks();

    if (endIndex < tasks.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    results.results = tasks.slice(startIndex, endIndex);
    res.status(200).json(results);
  } catch (error) {
    console.log('ALL TASK ERR', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// POST /tasks
export async function createTask(req: Request, res: Response): Promise<void> {
  const { name, description, status, priority, owners, accountable, subscribers } = req.body;
  try {
    const task = await TaskService.createTask({ name, description, status, priority, owners, accountable, subscribers });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// PUT /tasks/:id
export async function updateTask(req: Request, res: Response): Promise<void> {
  const taskId = req.params.id;
  const { name, description, status, priority, owners, accountable, subscribers } = req.body;
  try {
    const task = await TaskService.updateTask(taskId, { name, description, status, priority, owners, accountable, subscribers });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// GET /tasks/summary
export async function getSummary(req: Request, res: Response): Promise<void> {
  try {
    const tasks = await TaskService.getAllTasks();

    const summary = {
      backlog: 0,
      todo: 0,
      inprogress: 0,
      done: 0,
    };

    tasks.forEach(task => {
      if (task.status === 'backlog') {
        summary.backlog += 1;
      } else if (task.status === 'todo') {
        summary.todo += 1;
      } else if (task.status === 'inprogress') {
        summary.inprogress += 1;
      } else if (task.status === 'done') {
        summary.done += 1;
      }
    });

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// GET /tasks/:id
export async function getTaskById(req: Request, res: Response): Promise<void> {
  const taskId = req.params.id;
  try {
    const task = await TaskService.getTaskById(taskId);
    res.status(200).json({ result: { task } });
    
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}