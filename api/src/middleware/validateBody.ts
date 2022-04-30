import {NextFunction, Request, Response} from 'express';
import {ObjectSchema, ValidationError} from 'joi';
import SchemaValidationError from '../errors/SchemaValidationError';

// Takes request body and validates it against a given schema
export default function validateBody(schema: ObjectSchema<any>) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      // Validate schema
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (err) {
      // If there were any errors during validation, pass it to the error handler
      if (err instanceof ValidationError) next(new SchemaValidationError(err));
      else next(err);
    }
  };
}
