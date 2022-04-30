import HttpError from './HttpError';

// HTTP 404 Error
export default class NotFoundError extends HttpError {
  public error: string;
  constructor(error: string) {
    super(404, 'Not Found');
    this.error = error;
  }
}
