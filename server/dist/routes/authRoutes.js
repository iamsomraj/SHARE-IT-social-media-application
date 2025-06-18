"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("@/controllers/auth");
const schemas_1 = require("@/schemas");
const router = express_1.default.Router();
router.route('/').post((0, schemas_1.validateZodRequest)(schemas_1.ZodAuthSchema), auth_1.authorizeUser);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map