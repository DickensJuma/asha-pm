import { Request, Response } from 'express';
import User from '../models/user';
import UserService from '../services/userService';


/** @swagger
  * /api/v1/users/register:
  *   post:
  *     tags:
  *       - Users
  *     description: Register User
  *     operationId: registerUser
  *     summary: Register User
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             example: { "first_name":"John",  "last_name":"Doe", "email":"test@gmail.com","role": "user", "password": "test123" }
  *     responses:
  *       200:
  *         description: Information fetched succussfully
  *       400:
  *         description: Invalid request
  */
export async function registerUser(req: Request, res: Response): Promise<void> {
  
  try {
    // Create the user
    console.log(req.body);
    const user = await UserService.registerUser(req.body);
    res.status(201).json({result: { user } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// POST /login


/**
 * @swagger
  * /api/v1/users/login:
  *   post:
  *     tags:
  *      - Users
  *     summary: Authenticate user
  *     description: Returns a JWT token upon successful login
  *     security:
  *       - bearerAuth: []
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             example: {  "email":"john@test.co.ke", "password": "test123" }
  *     responses:
  *       200:
  *         description: Successful authentication
  */
export async function loginUser(req: Request, res: Response): Promise<void> {
  
    const { email, password } = req.body;
  try {
  //login user
    const token = await UserService.loginUser(email, password);
 
    res.status(200).json(token );
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// GET /users

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve a list of users
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
 *     description: Retrieve a list of users from the database
 *     responses:
 *       200:
 *         description: Successful response
 */
export async function getAllUsers(req: Request, res: Response): Promise<void> {
  // Pagination
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.perPage as string) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results: { next?: { page: number; limit: number }; results: User[] } = {
    results: []
  };

  try {
    const users = await UserService.getAllUsers();

    if (endIndex < users.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    results.results = users.slice(startIndex, endIndex);

    res.status(200).json(results);
  } catch (error) {
    console.log('USER ALL ERROR', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// GET /users/:id
/**
  * @swagger
  * /api/v1/users/{user_id}:
  *   get:
  *     tags:
  *       - Users
  *     description: Get User
  *     operationId: getUser
  *     summary: Get User
  *     security:
  *       - ApiKeyAuth: []
  *     parameters:
  *       - name: user_id
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
export async function getUserById(req: Request, res: Response): Promise<void> {
  const userId = req.params.user_id;
  try {
    const user = await UserService.getUser(userId);
    res.status(200).json({ result: { user } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// PUT /users/:user_id

/** @swagger
  * /api/v1/users/{user_id}:
  *   put:
  *     tags:
  *       - Users
  *     description: Update User
  *     operationId: updateUser
  *     summary: update User
  *     parameters:
  *       - name: user_id
  *         in: path
  *         required: true
  *         schema:
  *           type: string
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             example: { "first_name":"John", "last_name":"Doe", "email":"test@gmail.com", "password": "test123", "role": "user"}
  *     responses:
  *       200:
  *         description: Information fetched succussfully
  *       400:
  *         description: Invalid request
  */
export async function updateUser(req: Request, res: Response): Promise<void> {
  const userId = req.params.user_id;
  
  try {
    
    const updatedUser = await UserService.updateUser(userId, req.body);
 
    res.status(200).json({ result: { updatedUser } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// DELETE /users/:user_id


/**
  * @swagger
  * /api/v1/users/{user_id}:
  *   delete:
  *     tags:
  *       - Users
  *     description: Delete User
  *     operationId: deleteUser
  *     summary: Delete user
  *     security:
  *       - ApiKeyAuth: []
  *     parameters:
  *       - name: user_id
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
export async function deleteUser(req: Request, res: Response): Promise<void> {
  const userId = req.params.user_id;
  try {
   
    const deletedUser = await UserService.deleteUser(userId);
    res.status(200).json({ result: { deletedUser } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
