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
  authenticateToken,
  createCommentsSchema(),
  validate,
  commentController.createComment
);

router.delete("/:id", authenticateToken,validate, commentController.deleteComment);

router.get("/:id/comments-By-Post",authenticateToken,indexSchema(),validate,commentController.findAllCommentsByPost);

module.exports = router;
