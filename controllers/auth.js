// Création du fichier "auth.js" où on va déporter toute la logique métier

// On importe le package "bcrypt" qui permet le cryptage des mots de passe
const bcrypt = require("bcrypt");

// On importe le package "jsonwebtoken" qui permet de créer et vérifier les tokens
const jwt = require("jsonwebtoken");

// On importe le modèle "user.js" nécessaire à la logique métier des différents contrôleurs
const User = require("../models/User");

// CONTROLLER QUI PERMET LA CRÉATION DE NOUVEAU USER DANS LA BDD \\
exports.signup = (req, res, next) => {
  // On commence par "hasher" le mot de passe avec la fonction asynchrone bcrypt.hash
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// CONTROLLER QUI PERMET AUX UTILISATEURS EXISTANT DE SE CONNECTER À L'APPLICATION \\
exports.login = (req, res, next) => {
  // On utilise findOne pour trouver 1 seul utilisateur dans la base de donnée
  /// Et on veut que l'email de l'utilisateur trouvé correspond à celui envoyé dans la requête
  User.findOne({ email: req.body.email })
    // On vérifie si on a récupéré un user
    .then((user) => {
      // Si on a pas récupéré de user
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
      // Si on a récupéré un user alors on compare les hash des mots de passe
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }
          // Si les hash correspondent on crée un objet JSON
          res.status(200).json({
            userId: user._id,
            // On utilise la fonction "sign" de jwt
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
