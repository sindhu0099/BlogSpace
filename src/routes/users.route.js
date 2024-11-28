const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const {
  validate,
  createUserSchema,
  indexSchema,
} = require("../middlewares/Vadilators/users.validator");

router.post("/", createUserSchema(), validate, usersController.createUser);

router.put("/:id",validate, usersController.updateUser);

router.get("/:id",usersController.findOneUser);

router.get("/",indexSchema(),validate,usersController.findAllUser);

module.exports = router;
