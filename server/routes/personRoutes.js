const express = require("express");
const {
  getPersonProfile,
  registerPerson,
  loginPerson,
  followPerson,
  getPeople,
  getUserData,
} = require("../controllers/person/index.js");
const protect = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.route("/").post(registerPerson).get(protect, getUserData);
router.route("/auth").post(loginPerson);
router.route("/follow/:id").post(protect, followPerson);
router.route("/people").get(protect, getPeople);
router.route("/:id").get(protect, getPersonProfile);

module.exports = router;
