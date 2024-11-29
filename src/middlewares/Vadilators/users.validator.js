const { body, validationResult, query } = require("express-validator");
const db = require("../../db/db");

const createUserSchema = () => {
  return [
    body("first_name")
      .notEmpty()
      .withMessage("first Name is required")
      .isLength({ max: 30 })
      .withMessage("Maximum 30 characters are allowed"),
      body("last_name")
      .notEmpty()
      .withMessage("last Name is required")
      .isLength({ max: 30 })
      .withMessage("Maximum 30 characters are allowed"),
    body("phone")
      .notEmpty()
      .withMessage("Phone Number is required")
      .isMobilePhone()
      .withMessage("Invalid Phone Number")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone Number should be 10 digits")
      .custom((phone) => {
        return new Promise((resolve, reject) => {
          db.query(
            "SELECT phone FROM users WHERE phone = ?",
            [phone],
            (err, res) => {
              if (err) {
                reject(new Error("Server Error"));
              }
              if (res.length > 0) {
                reject(new Error("This phone number has been already taken"));
              }
              resolve(true);
            }
          );
        });
      }),
    body("email")
      .isEmail()
      .withMessage("Not a valid email address")
      .custom((email) => {
        return new Promise((resolve, reject) => {
          db.query(
            "SELECT email FROM users WHERE email = ?",
            [email],
            (error, res) => {
              if (error) {
                reject(new Error("Server Error"));
              }
              if (res.length > 0) {
                reject(new Error("This email has been already taken"));
              }
              resolve(true);
            }
          );
        });
      }),
    body("password")
      .isLength({ min: 7, max: 14 })
      .withMessage("Password must be 7 to 14 characters long"),
     
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];

  errors.array().map((err) => {
    extractedErrors.push({ [err.path]: err.msg });
  });

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
  createUserSchema,
};
