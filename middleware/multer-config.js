// Création du fichier "multer-config.js" qui va configurer multer, lui expliquer comment gérer les fichiers, où les enregistrer et quels noms leur donner

// On importe le package "multer"
const multer = require("multer");

// On crée un "dictionnaire" de MIMEtype
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// On crée un objet de configuration pour multer
/// On utilise la fonction "diskStorage" de multer pour indiquer qu'on va enregistrer sur le disque
const storage = multer.diskStorage({
  // "destination" est la fonction qui explique à multer où on va enregistrer les fichiers
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  // "filename" est la fonction qui explique à multer comment nommer les fichiers
  filename: (req, file, callback) => {
    // On génère le nouveau nom du fichier
    const name = file.originalname.split(" ").join("_");
    // On applique une extension au fichier
    const extension = MIME_TYPES[file.mimetype];
    // On crée le nom de fichier le plus unique possible
    callback(null, name + Date.now() + "." + extension);
  },
});

// On exporte notre middleware
module.exports = multer({ storage: storage }).single("image");
