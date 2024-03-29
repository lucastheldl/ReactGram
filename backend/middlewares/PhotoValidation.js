const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório")
      .isString(0)
      .isLength({ min: 3 })
      .withMessage("O título precisa ter pelo menos 3 caracteres"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("A imagem é obrigatória.");
      }
      return true;
    }),
  ];
};

const photoUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString(0)
      .withMessage("O titulo é obrigatorio")
      .isLength({ min: 3 })
      .withMessage("O título precisa ter pelo menos 3 caracteres"),
  ];
};
const photoCommentValidation = () => {
  return [
    body("comment")
      .isString(0)
      .withMessage("O comentário é obrigatorio")
      .isLength({ min: 3 })
      .withMessage("O comentário precisa ter pelo menos 3 caracteres"),
  ];
};

module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  photoCommentValidation,
};
