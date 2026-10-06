/**
 * Operational error carrying an HTTP status code.
 * Thrown from services and translated to a response by the error middleware.
 */
export class HttpError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}
