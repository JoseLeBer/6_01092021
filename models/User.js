// On crée un modèle "user" avec Mongoose
const mongoose = require("mongoose");

// On ajoute le plugin "mongoose-unique-validator"
// C'est une protection supplémentaire à "unique: true" pour éviter des erreurs de MongoDb
const uniqueValidator = require("mongoose-unique-validator");

// On crée le schéma "userSchema"
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// On doit appliquer le validator "mongoose-unique-validator" au schéma avant d'en faire un modèle
userSchema.plugin(uniqueValidator);

// On exporte ce modèle
module.exports = mongoose.model("User", userSchema);
