import DomainError from './DomainError';

export class ServiceUnavailableError extends DomainError {
  protected error_name = 'serviceUnavailable';

  protected httpCode = 503;

  public constructor(message = 'Service currently unavailable, please try again later', error?: Error, data?: any) {
    super(message, error, data, false);
    Error.captureStackTrace(this, this.constructor);
  }
}
