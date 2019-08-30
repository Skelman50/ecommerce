import expressValidator from "express-validator";

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

  formDataValidation(fields) {
    const {
      name,
      description,
      price,
      category,
      shipping,
      quantity,
      photo
    } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !shipping ||
      !quantity ||
      !photo
    ) {
      return false;
    }
    return true;
  }
}

const validator = new Validator();

export { validator };
