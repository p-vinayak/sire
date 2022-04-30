import {NextFunction, Request, Response} from 'express';
import UnauthorizedError from '../errors/UnauthorizedError';

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Checks if user is authenticated
  if (req.isAuthenticated()) next();
  else next(new UnauthorizedError('You are not logged in'));
}
