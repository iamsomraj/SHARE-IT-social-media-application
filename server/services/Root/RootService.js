/**
 * CLASS ROOTERROR FOR HANDLING ERRORS
 */
class RootError extends Error {
  constructor(status, message) {
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
   * @param {number} status
   * @param {string} message
   */
  raiseError(status, message) {
    throw new RootError(status, message);
  }
}

module.exports = RootService;
