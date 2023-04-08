const express = require("express");
const router = express.Router();

//Controllers

//Midlewares
const { photoInsertValidation } = require("../middlewares/PhotoValidation");
const authGuard = require("../middlewares/authGuard");
const validade = require("../middlewares/handleValidation");

//Routes

module.exports = router;
