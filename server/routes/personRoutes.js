const express = require("express");
const { getPersonProfile, registerPerson, loginPerson, followPerson, getPeople, getUserData, unfollowPerson } = require("../controllers/person/index.js");
const protect = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.route("/").post(registerPerson).get(protect, getUserData);
router.route("/auth").post(loginPerson);
router.route("/follow/:uuid").post(protect, followPerson);
router.route("/unfollow/:uuid").post(protect, unfollowPerson);
router.route("/people").get(protect, getPeople);
router.route("/:uuid").get(protect, getPersonProfile);

module.exports = router;
