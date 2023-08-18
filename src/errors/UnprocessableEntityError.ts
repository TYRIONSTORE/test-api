import DomainError from './DomainError';

export class UnprocessableEntityError extends DomainError {
  protected error_name = 'unprocessableEntity';

  protected httpCode = 422;

  public constructor(message = 'Unable to process the contained instructions. Please try again', error?: Error, data?: any) {
    super(message, error, data, false);
    Error.captureStackTrace(this, this.constructor);
  }
}
