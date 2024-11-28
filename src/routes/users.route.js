const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const {
  validate,
  createUserSchema,
  indexSchema,
} = require("../middlewares/Vadilators/users.validator");
const { authenticateToken } = require("../middlewares/authentication");

router.post("/", createUserSchema(), validate, usersController.createUser);

router.put("/:id", authenticateToken, validate, usersController.updateUser);

router.delete("/:id", usersController.deleteUser);

router.get("/:id", authenticateToken, usersController.findOneUser);

router.get(
  "/",
  authenticateToken,
  indexSchema(),
  validate,
  usersController.findAllUser
);

router.post("/login", usersController.userLogin);

module.exports = router;
