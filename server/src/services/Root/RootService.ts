/**
 * CLASS ROOTERROR FOR HANDLING ERRORS
 */
export class RootError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/**
 * CLASS ROOTSERVICE FOR HANDLING SERVICES
 */
class RootService {
  /**
   * @description HELPER FUNCTION TO RAISE AND THROW ERROR
   * @param status - HTTP status code
   * @param message - Error message
   */
  raiseError(status: number, message: string): never {
    throw new RootError(status, message);
  }
}

export default RootService;
