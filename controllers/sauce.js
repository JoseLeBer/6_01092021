const Sauce = require("../models/Sauce");

// On importe le package "fs" pour avoir accès aux différentes opérations lié au système de fichier
const fs = require("fs");

// CONTROLLER QUI PERMET LA CRÉATION D'UNE SAUCE \\
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    // On modifie l'URL de l'image car c'est notre middleware multer qui a généré le fichier
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
    .catch((error) => res.status(400).json({ error }));
};

// CONTROLLER QUI PERMET LA MISE À JOUR D'UNE SAUCE \\
exports.updateSauce = (req, res, next) => {
  const sauceObject = req.file
    ? // On utilise ? pour savoir si req.file existe
      {
        // Si req.file existe
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : // Si req.file n'existe pas
      { ...req.body };

  if (req.file) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        // On récupère le nom du fichier
        const filename = sauce.imageUrl.split("/images/")[1];
        // Avec ce nom de fichier on appelle la fonction "unlink" qui permet de supprimer un fichier
        fs.unlink(`images/${filename}`, () => {});
      })
      .catch((error) => res.status(500).json({ error }));
  }

  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce modifiée" }))
    .catch((error) => res.status(400).json({ error }));
};

// CONTROLLER QUI PERMET LA SUPPRESSION D'UNE SAUCE \\
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // On récupère le nom du fichier
      const filename = sauce.imageUrl.split("/images/")[1];
      // Avec ce nom de fichier on appelle la fonction "unlink" qui permet de supprimer un fichier
      fs.unlink(`images/${filename}`, () => {
        // On supprime l'objet de la bdd
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// CONTROLLER QUI AFFICHE UNE SAUCE \\
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// CONTROLLER QUI AFFICHE TOUTES LES SAUCES \\
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

// CONTROLLER QUI GÈRE LE SYSTEME DE LIKE ET DISLIKE \\
exports.likeOrDislikeSauce = (req, res, next) => {
  let like = req.body.like;
  let userId = req.body.userId;
  let sauceId = req.params.id;

  switch (like) {
    case 1:
      Sauce.updateOne(
        { _id: sauceId },
        { $push: { usersLiked: userId }, $inc: { likes: +1 } }
      )
        .then(() => res.status(200).json({ message: "Sauce likée" }))
        .catch((error) => res.status(400).json({ error }));

      break;

    case 0:
      Sauce.findOne({ _id: sauceId })
        .then((sauce) => {
          if (sauce.usersLiked.includes(userId)) {
            Sauce.updateOne(
              { _id: sauceId },
              { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
            )
              .then(() =>
                res.status(200).json({
                  message:
                    "Remise à 0 des likes pour cette sauce avec votre compte",
                })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          if (sauce.usersDisliked.includes(userId)) {
            Sauce.updateOne(
              { _id: sauceId },
              { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
            )
              .then(() =>
                res.status(200).json({
                  message:
                    "Remise à 0 des dislikes pour cette sauce avec votre compte",
                })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(404).json({ error }));

      break;

    case -1:
      Sauce.updateOne(
        { _id: sauceId },
        { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } }
      )
        .then(() => {
          res.status(200).json({ message: "Sauce dislikée" });
        })
        .catch((error) => res.status(400).json({ error }));

      break;
  }
};
