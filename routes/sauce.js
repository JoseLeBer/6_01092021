const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const isOwner = require("../middleware/is-owner");
const multer = require("../middleware/multer-config");

// On importe le contrôleur "sauce.js"
const sauceCtrl = require("../controllers/sauce");

// On modifie le "app." par "router." et également la route de base "/api/sauces" par "/"
// On applique aux routes, le middleware auth pour les protéger
// On applique aux routes concernées, le middleware multer
// On applique aux routes la logique métier des contrôleurs
router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.updateSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/", auth, sauceCtrl.getAllSauce);
router.post("/:id/like", auth, sauceCtrl.likeOrDislikeSauce);

// On exporte le routeur pour pouvoir l'utiliser dans app.js
module.exports = router;
