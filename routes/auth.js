// Création d'un dossier "routes" où on va déporter toute la logique de routing

// Pour créer le routeur on a besoin d'Express
const express = require("express");

// On crée le router avec la fonction .Router() d'Express
const router = express.Router();

// On importe le contrôleur "auth.js"
const authCtrl = require("../controllers/auth");

// On modifie le "app." par "router." et également la route de base "/api/auth" par "/"
/// On applique aux routes la logique métier des contrôleurs
router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);

// On exporte le routeur pour pouvoir l'utiliser dans app.js
module.exports = router;
