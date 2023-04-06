const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no minimo 3 caracteres.."),
    body("email")
      .isString()
      .withMessage("O email é obrigatório.")
      .isEmail()
      .withMessage("Insira um email válido"),
    body("password")
      .isString()
      .withMessage("a senha é obrigatória")
      .isLength({ min: 5 })
      .withMessage("A senha precisa ter 5 caracteres."),
    body("confirmpassword")
      .isString()
      .withMessage("a confirmação de senha é obrigatória")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("As senhas não são iguais");
        } else {
          return true;
        }
      }),
  ];
};

const userUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter pelo menos 3 caracteres"),
    body("password")
      .optional()
      .isLength({ min: 5 })
      .withMessage("A senha precisa ter 5 caracteres."),
  ];
};

const loginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("O email é obrigatório")
      .isEmail()
      .withMessage("Insira um email válido"),
    body("password").isString().withMessage("A senha é obrigatória"),
  ];
};

module.exports = {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
};
