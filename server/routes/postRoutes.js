const express = require("express");
const { addLike, createPost, getPostFeed, removeLike } = require("../controllers/post/index.js");

const protect = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.route("/create").post(protect, createPost);
router.route("/feed").get(protect, getPostFeed);
router.route("/like/:uuid").post(protect, addLike);
router.route("/unlike/:uuid").post(protect, removeLike);

module.exports = router;
