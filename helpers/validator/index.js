import expressValidator from "express-validator";

// export const userSignUpValidator = (req, res, next) => {
//   req
//     .check("name", "Name is required")
//     .notEmpty()
//     .isString()
//     .withMessage("name must be a string");
//   req
//     .check("email", "Email is required")
//     .notEmpty()
//     .isEmail()
//     .withMessage("write correct email");
//   req
//     .check("password", "Password is required")
//     .notEmpty()
//     .isLength({ min: 6 })
//     .withMessage("PasswordLength must be min 6 words");

//   const errors = req.validationErrors();
//   if (errors) {
//     const error = errors.map(err => err.msg)[0];
//     return res.status(400).json({ error });
//   }

//   next();
// };

const { check, validationResult } = expressValidator;

class Validator {
  constructor() {
    this.userSignUpValidator = [
      check("name", "Name is required")
        .exists()
        .isString()
        .withMessage("name must be a string"),
      check("email", "Email is required")
        .exists()
        .isEmail()
        .withMessage("write correct email"),
      check("password", "Password is required")
        .exists()
        .isLength({ min: 6 })
        .withMessage("PasswordLength must be min 6 words")
    ];
  }

  validation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const msg = errors.array().map(err => err.msg)[0];
      return res.status(422).json({ error: true, msg });
    }
    next();
  }
}

const validator = new Validator();

export { validator };
