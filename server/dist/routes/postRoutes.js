"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = require("@/controllers/post");
const auth_1 = require("@/middlewares/auth");
const schemas_1 = require("@/schemas");
const router = express_1.default.Router();
router
    .route('/create')
    .post(auth_1.authenticateToken, (0, schemas_1.validateZodRequest)(schemas_1.ZodCreatePostSchema), post_1.createPost);
router.route('/feed').get(auth_1.authenticateToken, post_1.getFeedPosts);
router.route('/stories').get(auth_1.authenticateToken, post_1.getStories);
router
    .route('/like/:uuid')
    .post(auth_1.authenticateToken, (0, schemas_1.validateZodParams)(schemas_1.ZodUuidParamsSchema), post_1.addLike);
router
    .route('/unlike/:uuid')
    .post(auth_1.authenticateToken, (0, schemas_1.validateZodParams)(schemas_1.ZodUuidParamsSchema), post_1.removeLike);
router
    .route('/add-story/:post_uuid')
    .post(auth_1.authenticateToken, (0, schemas_1.validateZodParams)(schemas_1.ZodPostUuidParamsSchema), post_1.addStory);
router
    .route('/remove-story/:post_uuid')
    .post(auth_1.authenticateToken, (0, schemas_1.validateZodParams)(schemas_1.ZodPostUuidParamsSchema), post_1.removeStory);
router
    .route('/:uuid')
    .get(auth_1.authenticateToken, (0, schemas_1.validateZodParams)(schemas_1.ZodUuidParamsSchema), post_1.fetchPost);
exports.default = router;
//# sourceMappingURL=postRoutes.js.map