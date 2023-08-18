import DomainError from './DomainError';

export class ForbiddenError extends DomainError {
  protected error_name = 'forbidden';

  protected httpCode = 403;

  public constructor(message = 'Unauthorized access', error?: Error, data?: any) {
    super(message, error, data, false);
    Error.captureStackTrace(this, this.constructor);
  }
}
