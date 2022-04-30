import {ValidationError} from 'joi';
import HttpError from './HttpError';

interface FieldValidationError {
  field: string;
  message: string;
}

// Creates HTTP Error out of schema validation error
export default class SchemaValidationError extends HttpError {
  public errors: FieldValidationError[];
  constructor(validationErrors: ValidationError) {
    super(400, 'Bad Request');
    // Convert schema validation errors to presentable format
    this.errors = validationErrors.details.map(error => {
      return {field: error.path.join('.'), message: error.message};
    });
  }
}
