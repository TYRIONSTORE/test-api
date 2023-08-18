import DomainError from './DomainError';

export class NotImplementedError extends DomainError {
  protected error_name = 'notImplemented';

  protected httpCode = 501;

  public constructor(message = 'Request method is not supported by the server and cannot be handled', error?: Error, data?: any) {
    super(message, error, data, false);
    Error.captureStackTrace(this, this.constructor);
  }
}
