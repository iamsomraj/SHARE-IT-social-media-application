"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_1 = require("../controllers/post");
const auth_1 = require("../middlewares/auth");
const schemas_1 = require("../schemas");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateToken);
router.post('/create', (0, schemas_1.validate)('body', schemas_1.CreatePostSchema), post_1.createPost);
router.get('/feed', post_1.getFeedPosts);
router.get('/stories', post_1.getStories);
router.post('/like/:uuid', (0, schemas_1.validate)('params', schemas_1.UuidParamsSchema), post_1.addLike);
router.post('/unlike/:uuid', (0, schemas_1.validate)('params', schemas_1.UuidParamsSchema), post_1.removeLike);
router.post('/add-story/:post_uuid', (0, schemas_1.validate)('params', schemas_1.PostUuidParamsSchema), post_1.addStory);
router.post('/remove-story/:post_uuid', (0, schemas_1.validate)('params', schemas_1.PostUuidParamsSchema), post_1.removeStory);
router.get('/:uuid', (0, schemas_1.validate)('params', schemas_1.UuidParamsSchema), post_1.fetchPost);
exports.default = router;
//# sourceMappingURL=postRoutes.js.map