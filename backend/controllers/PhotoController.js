const Photo = require("../models/Photos");
const User = require("../models/Users");

const mongoose = require("mongoose");

//Insert a photo with a user related to it

const insertPhoto = async (req, res) => {
  const title = req.title;
  const image = req.file.filename;

  const reUser = req.user;
  const user = await User.findById(reUser._id);

  //Create a Photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    username: user.name,
  });
  //If photo was created sucessfully, return data
  if (!newPhoto) {
    res
      .status(422)
      .json({ errors: ["Houve um problema, por favor tente novamente"] });
  }
  res.status(201).json(newPhoto);
};
//Remove a photo from db

const deletePhoto = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const reqUser = req.user;
  try {
    const photo = await Photo.findById(id);

    //Check if photo exist
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada1"] });
      return;
    }

    //Check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({ errors: ["Usuário inválido"] });
      return;
    }
    await Photo.findByIdAndDelete(photo._id);
    res.status(200).json({
      id: photo._id,
      message: ["Foto excluida com sucesso"],
    });
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada"] });
  }
};

//Get all photos
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

//Get user photos
const getUserPhotos = async (req, res) => {
  const { id } = req.params;

  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

//Get photo by id
const getPhotoById = async (req, res) => {
  const { id } = req.params;

  try {
    const photo = await Photo.findById(id);

    if (!photo) {
      return res.status(404).json({ errors: ["Foto não encontrada"] });
    }
    return res.status(200).json(photo);
  } catch (error) {
    return res.status(422).json({ errors: ["Id inválido"] });
  }
};
//Update a photo
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  if (!photo) {
    return res.status(404).json({ errors: ["Foto não encontrada"] });
  }

  //check if photo belongs to user
  if (!photo.userId.equals(reqUser._id)) {
    return res
      .status(422)
      .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
  }

  if (title) {
    photo.title = title;
  }

  await photo.save();

  return res
    .status(200)
    .json({ photo, message: "Foto atualizada com scesso!" });
};
//Like funcionallity
const likePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  if (!photo) {
    return res.status(404).json({ errors: ["Foto não encontrada"] });
  }
  //check if user already liked the photo
  if (photo.likes.includes(reqUser._id)) {
    return res.status(422).json({ errors: ["Você já curtiu esta foto"] });
  }
  //Put user id in likes
  photo.likes.push(reqUser._id);

  photo.save();

  return res
    .status(200)
    .json({ photoId: id, userId: reqUser, message: "A photo foi curtida" });
};

//Comment in photo
const commentPhoto = async (req, res) => {
  const { id } = req.params;

  const { comment } = req.body;
  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const photo = await Photo.findById(id);

  if (!photo) {
    return res.status(404).json({ errors: ["Foto não encontrada"] });
  }

  //Put comment in comments array
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profile,
    userId: user.id,
  };
  photo.comments.push(userComment);

  await photo.save();

  return res
    .status(200)
    .json({ comment: userComment, message: "O commentário foi adicionado" });
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
};
