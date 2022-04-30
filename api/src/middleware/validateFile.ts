import {NextFunction, Request, Response} from 'express';
import BadRequestError from '../errors/BadRequestError';

// Validates a file field given the field name
export default function validateFile(fieldName: string) {
  return async function (req: Request, res: Response, next: NextFunction) {
    // Check if field name contains a file, otherwise return an error
    if (!req.file) next(new BadRequestError(`"${fieldName}" must be a file`));
    next();
  };
}
