const Sauce = require("../models/Sauce");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }, {})
    .then((sauce) => {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      const userId = decodedToken.userId;
      if (sauce.userId && sauce.userId !== userId) {
        throw "User ID non valable";
      } else {
        next();
      }
    })
    .catch((error) =>
      res.status(401).json({ error: error | "Requête non authentifiée" })
    );
};
