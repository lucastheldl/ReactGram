const express = require("express");
const router = express.Router();

//Controllers
const { insertPhoto, deletePhoto } = require("../controllers/PhotoController");

//Midlewares
const { photoInsertValidation } = require("../middlewares/PhotoValidation");
const authGuard = require("../middlewares/authGuard");
const validade = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpload");

//Routes

router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validade,
  insertPhoto
);
router.delete("/:id", authGuard, deletePhoto);

module.exports = router;
