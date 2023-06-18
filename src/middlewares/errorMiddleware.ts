import { Request, Response, NextFunction } from 'express';

function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  // Log the error
  console.error(err);

  // Set a default status code and error message
  const statusCode: number = err.statusCode || 500;
  const errorMessage: string = err.message || 'Internal Server Error';

  // Send the error response
  res.status(statusCode).json({ error: errorMessage });
}

export default errorMiddleware;
