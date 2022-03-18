const express = require("express");
const { addLike } = require("../controllers/post/index.js");

const protect = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.route("/:id").post(protect, addLike);

module.exports = router;
