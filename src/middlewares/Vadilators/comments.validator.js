const { body, validationResult, query } = require("express-validator");

const createCommentsSchema = () => {
  return [
    body("post_id").notEmpty().withMessage("Post Id is required"),
    body("user_id").notEmpty().withMessage("User Id is required"),
    body("comments")
      .notEmpty()
      .withMessage("comments is required")
      .isLength({ max: 255 })
      .withMessage("Maximum 255 characters are allowed"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    code: 2001,
    message: "Data validation failed",
    errors: extractedErrors,
  });
};

const indexSchema = () => {
  return [
    query("page").notEmpty().withMessage("Page is required"),
    query("per-page").notEmpty().withMessage("Per Page is required"),
  ];
};

module.exports = {
  validate,
  indexSchema,
  createCommentsSchema,
};
