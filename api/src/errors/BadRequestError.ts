import HttpError from './HttpError';

// HTTP 400 Error
export default class BadRequestError extends HttpError {
  public error: string;
  constructor(error: string) {
    super(400, 'Bad Request');
    this.error = error;
  }
}
