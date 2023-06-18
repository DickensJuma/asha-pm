import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import UserService from '../services/userService';

// POST /register
export async function registerUser(req: Request, res: Response): Promise<void> {
  
  try {
    // Create the user
    const user = await UserService.createUser(req.body);
    res.status(201).json({result: { user } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// POST /login
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

// PUT /users/:id
export async function updateUser(req: Request, res: Response): Promise<void> {
  const userId = req.params.id;
  
  try {
    
    const updatedUser = await UserService.updateUser(userId, req.body);
 
    res.status(200).json({ result: { updatedUser } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// DELETE /users/:id
export async function deleteUser(req: Request, res: Response): Promise<void> {
  const userId = req.params.id;
  try {
   
    const deletedUser = await UserService.deleteUser(userId);
    res.status(200).json({ result: { deletedUser } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
