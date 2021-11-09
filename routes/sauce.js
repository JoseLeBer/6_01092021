// Création d'un dossier "routes" où on va déporter toute la logique de routing

// Pour créer le routeur on a besoin d'Express
const express = require("express");

// On crée le router avec la fonction .Router() d'Express
const router = express.Router();

// On importe le middleware protégeant nos routes avec authetification par token
const auth = require("../middleware/auth");

// On importe le contrôleur "sauce.js"
const sauceCtrl = require("../controllers/sauce");

// On importe le middleware qui gère les fichiers entrant
const multer = require("../middleware/multer-config");

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
