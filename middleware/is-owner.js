const Sauce = require("../models/Sauce");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // On récupère le token dans le header "authorization"
    const token = req.headers.authorization.split(" ")[1];
    // Puis on décrypte le token avec la fonction "verify" de jwt
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    // On récupère le userId contenu dans le token
    const userId = decodedToken.userId;
    // Si il y a un userId dans le corps de la requête && qu'il est différent de celui du token
    if (res.body.userId && res.body.userId !== userId) {
      throw "User ID non valable";
      // Sinon on appelle le prochain middleware (dans le fichier dossier "routes" - fichier "sauces.js")
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée" });
  }
};
