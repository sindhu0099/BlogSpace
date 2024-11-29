const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts.controller");
const {
  validate,
  createPostSchema,
  indexSchema,
} = require("../middlewares/Vadilators/posts.validator");

const { authenticateToken } = require("../middlewares/authentication");

router.post("/",authenticateToken, createPostSchema(), validate, postController.createPost);

router.put("/:id", authenticateToken, validate, postController.updatePost);

router.delete("/:id", authenticateToken, postController.deletePost);

router.get("/:id", authenticateToken, postController.findOnePost);

router.get("/:id/postbyuser",authenticateToken, indexSchema(), validate, postController.findAllPostsByUser);

module.exports = router;
