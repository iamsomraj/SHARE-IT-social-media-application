"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_DEVELOPMENT = exports.IS_TEST = exports.IS_PRODUCTION = exports.ENVIRONMENT = void 0;
exports.ENVIRONMENT = Object.freeze({
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
    TEST: 'test',
});
exports.IS_PRODUCTION = process.env.NODE_ENV === exports.ENVIRONMENT.PRODUCTION;
exports.IS_TEST = process.env.NODE_ENV === exports.ENVIRONMENT.TEST;
exports.IS_DEVELOPMENT = process.env.NODE_ENV === exports.ENVIRONMENT.DEVELOPMENT;
//# sourceMappingURL=environments.js.map