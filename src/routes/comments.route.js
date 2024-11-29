const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middlewares/authentication");
const {
  validate,
  createCommentsSchema,
  indexSchema
} = require("../middlewares/Vadilators/comments.validator");

const commentController = require("../controllers/comments.controller");

router.post(
  "/",
  createCommentsSchema(),
  validate,
  commentController.createComment
);

router.delete("/:id", validate, commentController.deleteComment);

router.get("/:id/comments-By-Post",indexSchema(),validate,commentController.findAllCommentsByPost);

module.exports = router;
