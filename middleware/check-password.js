const passwordSchema = require("../models/Password");

module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res
      .status(401)
      .json({
        error:
          "Votre mot de passe doit contenit au moins 10 caractères, une majuscule, une minuscule et au moins un chiffre.",
      });
  } else {
    next();
  }
};
