"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootError = void 0;
class RootError extends Error {
    status;
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.RootError = RootError;
class RootService {
    raiseError(status, message) {
        throw new RootError(status, message);
    }
}
exports.default = RootService;
//# sourceMappingURL=RootService.js.map