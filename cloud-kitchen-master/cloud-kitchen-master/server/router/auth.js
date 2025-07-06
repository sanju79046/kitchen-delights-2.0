const express = require("express");

const router = express.Router();

const { login, signin, editUser } = require("../controller/authController");
const verifyToken = require("../middleware/verifyToken");

router.route("/login").post(login);

router.route("/signin").post(signin);

router.route("/edit-user").patch(verifyToken, editUser);

module.exports = router;
