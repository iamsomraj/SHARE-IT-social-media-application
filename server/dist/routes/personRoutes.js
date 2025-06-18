"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const person_1 = require("../controllers/person");
const auth_1 = require("../middlewares/auth");
const schemas_1 = require("../schemas");
const router = express_1.default.Router();
router
    .route('/')
    .post((0, schemas_1.validateZodRequest)(schemas_1.ZodRegisterSchema), person_1.registerPerson)
    .get(auth_1.authenticateToken, person_1.getUserData);
router.route('/auth').post((0, schemas_1.validateZodRequest)(schemas_1.ZodLoginSchema), person_1.loginPerson);
router
    .route('/follow/:uuid')
    .post(auth_1.authenticateToken, (0, schemas_1.validateZodParams)(schemas_1.ZodUuidParamsSchema), person_1.followPerson);
router
    .route('/unfollow/:uuid')
    .post(auth_1.authenticateToken, (0, schemas_1.validateZodParams)(schemas_1.ZodUuidParamsSchema), person_1.unfollowPerson);
router
    .route('/people')
    .get(auth_1.authenticateToken, (0, schemas_1.validateZodQuery)(schemas_1.ZodPaginationQuerySchema), person_1.getPeople);
router
    .route('/:uuid')
    .get(auth_1.authenticateToken, (0, schemas_1.validateZodParams)(schemas_1.ZodUuidParamsSchema), person_1.getPersonProfile);
router
    .route('/search/')
    .post(auth_1.authenticateToken, (0, schemas_1.validateZodRequest)(schemas_1.ZodSearchQuerySchema), person_1.search);
exports.default = router;
//# sourceMappingURL=personRoutes.js.map