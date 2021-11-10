const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

module.exports = (req, res, next) => {
  if (!emailRegex.test(req.body.email)) {
    res.status(401).json({
      message: "Le format de votre adresse email n'est pas valide.",
    });
  } else {
    next();
  }
};
