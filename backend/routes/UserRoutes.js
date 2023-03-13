const express = require("express");
const router = express.Router();

//controller
const { register, login } = require("../controllers/UserController");

//middlewares
const validade = require("../middlewares/handleValidation");
const {
  userCreateValidation,
  loginValidation,
} = require("../middlewares/userValidation");

//routes
router.post("/register", userCreateValidation(), validade, register);
router.post("/login", loginValidation(), validade, login);

module.exports = router;
