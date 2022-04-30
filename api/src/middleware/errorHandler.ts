import {NextFunction, Request, Response} from 'express';
import multer from 'multer';
import InternalServerError from '../errors/InternalServerError';
import BadRequestError from '../errors/BadRequestError';
import HttpError from '../errors/HttpError';

export default function errorHandler(
  err: HttpError | multer.MulterError | unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Return HTTP errors as they are
  if (err instanceof HttpError) res.status(err.statusCode).send(err);
  // Change multer (file upload package) errors to HTTP errors
  else if (err instanceof multer.MulterError) {
    const transformedError = new BadRequestError(err.message);
    res.status(transformedError.statusCode).send(transformedError);
  } else {
    // Any other errors are returned as an internal server error (500)
    const transformedError = new InternalServerError();
    res.status(transformedError.statusCode).send(transformedError);
  }
}
