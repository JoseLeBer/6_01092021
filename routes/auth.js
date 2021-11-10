const express = require("express");
const router = express.Router();

const authCtrl = require("../controllers/auth");
const checkEmail = require("../middleware/check-email");
const checkPassword = require("../middleware/check-password");

router.post("/signup", checkEmail, checkPassword, authCtrl.signup);
router.post("/login", authCtrl.login);

module.exports = router;
