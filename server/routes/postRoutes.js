const express = require("express");
const { addLike, createPost, getFeedPosts, removeLike, fetchPost, addStory, removeStory, getFavouritePosts } = require("../controllers/post/index.js");

const protect = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.route("/create").post(protect, createPost);
router.route("/feed").get(protect, getFeedPosts);
router.route("/stories").get(protect, getFavouritePosts);
router.route("/like/:uuid").post(protect, addLike);
router.route("/unlike/:uuid").post(protect, removeLike);
router.route("/favourite/:post_uuid").post(protect, addStory);
router.route("/unfavourite/:post_uuid").post(protect, removeStory);
router.route("/:uuid").get(protect, fetchPost);

module.exports = router;
