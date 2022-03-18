const express = require("express");
const {
  registerPerson,
  loginPerson,
} = require("../controllers/person/index.js");
const router = express.Router();

router.route("/").post(registerPerson);
router.route("/auth").post(loginPerson);

module.exports = router;
