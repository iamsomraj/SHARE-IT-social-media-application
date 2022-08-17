const express = require("express");
const { authorizeUser } = require("../controllers/auth/index.js");

const router = express.Router();

router.route("/").post(authorizeUser);

module.exports = router;
