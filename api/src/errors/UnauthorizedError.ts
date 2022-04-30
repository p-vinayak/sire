import HttpError from './HttpError';

// HTTP 401 Error
export default class UnauthorizedError extends HttpError {
  public details: string;
  constructor(details: string) {
    super(401, 'Unauthorized');
    this.details = details;
  }
}
