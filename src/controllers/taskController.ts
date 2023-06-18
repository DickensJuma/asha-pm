import { Request, Response } from 'express';
import Task from '../models/task';
import TaskService from '../services/taskService';

// GET /tasks

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Retrieve a list of tasks
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
 *     description: Retrieve a list of tasks from the database
 *     responses:
 *       200:
 *         description: Successful response
 */
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

// POST /tasks/create


/**
  * @swagger
  * /api/v1/tasks/create:
  *   post:
  *     tags:
  *       - Tasks
  *     description:  Create a new task
  *     operationId: createtask
  *     summary:  Create a new task
  *     security:
  *       - ApiKeyAuth: []
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             example: { "name": "Task 1", "description": "Task 1 description", "status": "open", "stage": "todo", "priority": "high", "owners": ["7c09585e-0af6-11ee-be56-0242ac120002"], "accountable": ["7c095b7e-0af6-11ee-be56-0242ac120002"], "subscribers": ["7c09585e-0af6-11ee-be56-0242ac120002"]   }
  *     responses:
  *       200:
  *         description: Information fetched succussfuly
  *       400:
  *         description: Invalid request
  */

export async function createTask(req: Request, res: Response): Promise<void> {
  console.log('CREATE TASK', req.body)

  try {
    const task = await TaskService.createTask(req.body)
    res.status(201).json(task);
  } catch (error) {
    console.log('CREATE TASK ERR', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// PUT /tasks/:id


/** @swagger
  * /api/v1/tasks/{task_id}:
  *   put:
  *     tags:
  *       - Tasks
  *     description: Update task
  *     operationId: updatetask
  *     summary: update task
  *     parameters:
  *       - name: task_id
  *         in: path
  *         required: true
  *         schema:
  *           type: string
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             example: { "name": "Task 1", "description": "Task 1 description", "status": "open","stage":"backlog", "priority": "high", "owners": ["7c09585e-0af6-11ee-be56-0242ac120002"], "accountable": "7c095b7e-0af6-11ee-be56-0242ac120002", "subscribers": ["7c09585e-0af6-11ee-be56-0242ac120002"]   }
  *     responses:
  *       200:
  *         description: Information fetched succussfully
  *       400:
  *         description: Invalid request
  */
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

/**
 * @swagger
 * /api/v1/tasks/summary/report:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Retrieve summary of tasks
 *     security:
 *       - ApiKeyAuth: []
 *     description: Retrieve a summary of tasks from the database
 *     responses:
 *       200:
 *         description: Successful response
 */
export async function getSummary(req: Request, res: Response): Promise<void> {
 
  try {
    const tasks = await TaskService.getAllTasks();
    

    const summary = {
      backlog: 0,
      todo: 0,
      inprogress: 0,
      done: 0,
      archive: 0,
      open: 0,
      closed: 0,
    };

    tasks.forEach(task => {
      if (task.stage === 'backlog') {
        summary.backlog += 1;
      } else if (task.stage === 'todo') {
        summary.todo += 1;
      } else if (task.stage === 'inprogress') {
        summary.inprogress += 1;
      } else if (task.stage === 'done') {
        summary.done += 1;
      } else if (task.stage === 'archive') {
        summary.archive += 1;
      } else if (task.status === 'open') {
        summary.open += 1;
      }
      else if (task.status === 'closed') {

        summary.closed += 1;
      }
    });

    res.status(200).json(summary);
  } catch (error) {
    console.log('ALL TASK ERR', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// GET /tasks/:id

/**
  * @swagger
  * /api/v1/tasks/{task_id}:
  *   get:
  *     tags:
  *       - Tasks
  *     description: Get Task by Id
  *     operationId: getTaskById
  *     summary: Get Task by Id
  *     security:
  *       - ApiKeyAuth: []
  *     parameters:
  *       - name: task_id
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
export async function getTaskById(req: Request, res: Response): Promise<void> {
  const taskId = req.params.rtask_id;
  try {
    const task = await TaskService.getTaskById(taskId);
    res.status(200).json({ result: { task } });
    
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}