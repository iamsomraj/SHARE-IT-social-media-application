/**
 * CLASS ROOTSERVICE
 */
class RootService {
  /**
   * @description HELPER FUNCTION TO RAISE AND THROW ERROR
   * @param {*} status
   * @param {*} message
   */
  raiseError(status, message) {
    res.status(status, message);
    throw new Error(message);
  }
}

module.exports = RootService;
