const express = require("express");
const { addLike, createPost, getFeedPosts, removeLike, fetchPost, addFavourite, removeFavourite, getFavouritePosts } = require("../controllers/post/index.js");

const protect = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.route("/create").post(protect, createPost);
router.route("/feed").get(protect, getFeedPosts);
router.route("/favourites").get(protect, getFavouritePosts);
router.route("/like/:uuid").post(protect, addLike);
router.route("/unlike/:uuid").post(protect, removeLike);
router.route("/favourite/:post_uuid").post(protect, addFavourite);
router.route("/unfavourite/:post_uuid").post(protect, removeFavourite);
router.route("/:uuid").get(protect, fetchPost);

module.exports = router;
