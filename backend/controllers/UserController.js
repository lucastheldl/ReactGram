const User = require("../models/Users");
//const conn = require("../config/db");

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
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  //check if user exists
  if (!user) {
    res.status(404).json({ errors: ["O usuário não existe"] });
    return;
  }
  //check if password match
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha incorreta"] });
    return;
  }

  //return user and token
  res.status(201).json({
    _id: user._id,
    prifileImage: user.profileImg,
    token: GenerateToken(user._id),
  });
};
//get Current LoggedIn user

const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};

//update user
const update = async (req, res) => {
  const { name, password, bio } = req.body;
  //res.send("update");

  let profileImage = null;
  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;

  const user = await User.findById(reqUser._id).select("-password");

  if (name) {
    user.name = name;
  }
  if (password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
  }

  if (profileImage) {
    user.profileImg = profileImage;
  }
  if (bio) {
    user.bio = bio;
  }

  await user.save();

  res.status(200).json(user);
};

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
};
