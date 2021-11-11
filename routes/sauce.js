const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const isOwner = require("../middleware/is-owner");
const multer = require("../middleware/multer-config");

const sauceCtrl = require("../controllers/sauce");

router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, isOwner, multer, sauceCtrl.updateSauce);
router.delete("/:id", isOwner, auth, sauceCtrl.deleteSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/", auth, sauceCtrl.getAllSauce);
router.post("/:id/like", auth, sauceCtrl.likeOrDislikeSauce);

module.exports = router;
