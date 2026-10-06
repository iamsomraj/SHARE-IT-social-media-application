"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const person_1 = require("../controllers/person");
const auth_1 = require("../middlewares/auth");
const schemas_1 = require("../schemas");
const router = (0, express_1.Router)();
router
    .route('/')
    .post((0, schemas_1.validate)('body', schemas_1.RegisterSchema), person_1.registerPerson)
    .get(auth_1.authenticateToken, person_1.getUserData);
router.post('/auth', (0, schemas_1.validate)('body', schemas_1.LoginSchema), person_1.loginPerson);
router.post('/follow/:uuid', auth_1.authenticateToken, (0, schemas_1.validate)('params', schemas_1.UuidParamsSchema), person_1.followPerson);
router.post('/unfollow/:uuid', auth_1.authenticateToken, (0, schemas_1.validate)('params', schemas_1.UuidParamsSchema), person_1.unfollowPerson);
router.get('/people', auth_1.authenticateToken, (0, schemas_1.validate)('query', schemas_1.PaginationQuerySchema), person_1.getPeople);
router.post('/search', auth_1.authenticateToken, (0, schemas_1.validate)('body', schemas_1.SearchSchema), person_1.search);
router.get('/:uuid', auth_1.authenticateToken, (0, schemas_1.validate)('params', schemas_1.UuidParamsSchema), person_1.getPersonProfile);
exports.default = router;
//# sourceMappingURL=personRoutes.js.map