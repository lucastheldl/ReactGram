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

  const reqUser = req.user;
  try {
    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    //Check if photo exist
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada1"] });
      return;
    }

    //Check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({ errors: ["Usuário inválido"] });
    }
    await Photo.findByIdAndDelete(photo._id);
    res.statys(200).json({
      id: photo._id,
      message: ["Foto excluida com sucesso"],
    });
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada"] });
  }
};

module.exports = {
  insertPhoto,
  deletePhoto,
};
