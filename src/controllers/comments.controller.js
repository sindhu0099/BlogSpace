const commentService = require("../services/comments.service");

const createComment = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await commentService.createComment(data);
    if (result.message && result.stack) {
      throw result;
    } else {
      return res.status(201).json({
        code: 1001,
        message: "Comment has been saved",
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const data = { ...req.params };
    const results = await commentService.deleteComment(data);
    if (results.message && results.stack) {
      throw results;
    } else if (results[0].affectedRows == 0) {
      return res.status(404).send({
        code: 2001,
        message: "Record not found",
      });
    } else {
      return res.status(200).send({
        code: 1001,
        message: "Comment has been deleted",
      });
    }
  } catch (error) {
    next(error);
  }
};

const findAllCommentsByPost = async (req, res, next) => {
  try {
    const data = {
      post_id: req.params.id,
      order: req.query.order,
      by: req.query.by,
      page: req.query.page,
      perPage: req.query["per-page"],
    };

    const result = await commentService.findAllCommentsByPost(data);
    if (result.message && result.stack) {
      throw result;
    } else if (result.length == 0) {
      return res.status(200).send(result);
    } else {
      const startRecord = (data.page - 1) * data.perPage + 1;
      const endRecord =
        result.COUNT === data.perPage
          ? data.perPage * data.perPage
          : result.totalCount;

      res.setHeader("X-Pagination-Total-Count", result.totalCount);
      res.setHeader("X-Pagination-Page-Count", result.totalPageCount);
      res.setHeader("X-Pagination-Current-Page", data.page);
      res.setHeader("X-Pagination-Per-Page", data.perPage);
      res.setHeader("X-Pagination-Start-Record", startRecord);
      res.setHeader("X-Pagination-End-Record", endRecord);
      return res.status(200).send(result.finalResult);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
  deleteComment,
  findAllCommentsByPost,
};
