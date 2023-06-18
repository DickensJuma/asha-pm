import express,{ Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Get the JWT token from the request headers
  const token: string | undefined = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify and decode the JWT token
    const decoded: any = jwt.verify(token, 'secretKey');
    // Attach the decoded user ID to the request object
    //req.userId = decoded.id;
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export default authMiddleware;
