import HttpError from './HttpError';

// HTTP 409 Error
export default class ConflictError extends HttpError {
  public details: string;
  constructor(details: string) {
    super(409, 'Conflict');
    this.details = details;
  }
}
