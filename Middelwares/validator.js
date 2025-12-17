const { body } = require("express-validator");

let validator = [
  body("name")
    .notEmpty()
    .withMessage("user name must not be empty")
    .isLength({ min: 3, max: 30 })
    .withMessage("user name must be 3 to 30 characters long"),

  body("email")
    .notEmpty()
    .withMessage("email must not be empty")
    .isEmail()
    .withMessage("email must be a valid email"),

  body("age")
    .notEmpty()
    .withMessage("age must not be empty")
    .isInt({ min: 1, max: 120 })
    .withMessage("age must be a number between 1 and 120"),

  body("password")
    .notEmpty()
    .withMessage("password must not be empty")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage("password must be strong (include upper, lower, number, symbol)"),
];

module.exports = validator;
