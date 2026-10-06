"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const schemas_1 = require("../schemas");
const router = (0, express_1.Router)();
router.post('/', (0, schemas_1.validate)('body', schemas_1.AuthSchema), auth_1.authorizeUser);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map