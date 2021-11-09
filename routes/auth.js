const express = require("express");
const router = express.Router();

const authCtrl = require("../controllers/auth");
const checkPassword = require("../middleware/check-password");

router.post("/signup", checkPassword, authCtrl.signup);
router.post("/login", authCtrl.login);

// On exporte le routeur pour pouvoir l'utiliser dans app.js
module.exports = router;
