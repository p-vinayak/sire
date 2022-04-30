import HttpError from './HttpError';

// HTTP 500 Error
export default class InternalServerError extends HttpError {
  public details: string;
  constructor() {
    super(500, 'Internal Server Error');
    this.details = 'Something went wrong';
  }
}
