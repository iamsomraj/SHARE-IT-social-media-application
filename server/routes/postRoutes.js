const express = require("express");
const { addLike, createPost } = require("../controllers/post/index.js");

const protect = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.route("/create").post(protect, createPost);
router.route("/:id").post(protect, addLike);

module.exports = router;
