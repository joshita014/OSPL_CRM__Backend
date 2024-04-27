import { body, validationResult } from "express-validator";

// create rules

export const validateUserCreation = async (req, res, next) => {
  const rules = [
    body("firstName").notEmpty().withMessage("Please enter first name"),
    body("lastName").notEmpty().withMessage("Please enter last name"),
    body("email").isEmail().withMessage("Please enter valid email"),
    body("password")
      .isStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1,
      })
      .withMessage("Enter strong password : Minimum length is 8"),
  ];
  await Promise.all(rules.map((rule) => rule.run(req)));

  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    return res
      .status(301)
      .json({ status: "fail", message: validationError.array()[0].msg });
  }
  next();
};
