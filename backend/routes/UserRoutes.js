const express = require("express");
const router = express.Router();

//controller
const { register } = require("../controllers/UserController");

//middlewares
const validade = require("../middlewares/handleValidation");

//routes
router.post("/register", validade, register);

module.exports = router;
