const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    // On récupère le token dans le header "authorization"
    const token = req.headers.authorization.split(" ")[1];
    // Puis on décrypte le token avec la fonction "verify" de jwt
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    // On récupère le userId contenu dans le token
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée" });
  }
};
