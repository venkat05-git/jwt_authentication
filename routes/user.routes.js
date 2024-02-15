const express = require("express");
const {
  register,
  login,
  authenticateToken,
  page,
} = require("../controllers/user.controller");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/protected").get(authenticateToken, page);

module.exports = router;
