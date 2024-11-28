const { body, validationResult, query } = require("express-validator");
const db = require("../../db/db");

const   createPostSchema = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .isLength({ max: 30 })
      .withMessage("Maximum 30 characters are allowed"),
      body("content")
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ max: 30 })
      .withMessage("Maximum 30 characters are allowed"),
     
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
  createPostSchema,
};
