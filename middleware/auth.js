// Création du fichier "auth.js" où on vérifie le token envoyé dans la requête de l'application front-end
/// On vérifie que c'est un token valable et aussi que, si il y a un userId qui est envoyé avec la requête il corresponde à celui encodé dans le token

// On importe le package "jsonwebtoken" qui permet de créer et vérifier les tokens
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
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable";
      // Sinon on appelle le prochain middleware (dans le fichier dossier "routes" - fichier "sauces.js")
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée" });
  }
};
