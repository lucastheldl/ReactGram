const User = require("../models/Users");
const conn = require("../config/db");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

//conn();
//generate user token
const GenerateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

//register user and sign in
const register = async (req, res) => {
  const { name, email, password } = req.body;

  //check if user exists
  const user = await User.findOne({ email });

  if (user) {
    res.status(422).json({ errors: ["por favor, utilize outro email"] });
    return;
  }

  //generate password hash

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  //Create user
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });
  //If User was created sucessfully,return token
  if (!newUser) {
    res
      .status(422)
      .json({ errors: ["Houve um erro por favor tente mais tarde"] });
    return;
  }
  res.status(201).json({
    _id: newUser._id,
    token: GenerateToken(newUser._id),
  });

  res.send("Registro");
};
//sign in user
const login = ({ req, res }) => {
  res.send("login");
};

module.exports = {
  register,
  login,
};
