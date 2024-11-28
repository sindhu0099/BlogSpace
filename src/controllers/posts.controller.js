const postService = require("../services/posts.service");

const createPost = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await postService.createPost(data);
    if (result.message && result.stack) {
      throw result;
    } else {
      return res.status(201).json({
        code: 1001,
        message: "Post has been successfully created",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const data = { ...req.body, ...req.params };
    const results = await postService.updatePost(data);
    if (results.message && results.stack) {
      throw results;
    } else if (results[0].affectedRows == 0) {
      return res.status(404).send({
        code: 2001,
        message: "Record is not found",
      });
    } else {
      return res.status(200).send({
        code: 1001,
        message: "Post has been successfully updated",
      });
    }
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
      const data = { ...req.params };
      const results = await postService.deletePost(data);
      if (results.message && results.stack) {
          throw results;
      } else if (results[0].affectedRows == 0) {
          return res.status(404).send({
              code: 2001,
              message: "Record not found"
          });
      } else {
          return res.status(200).send({
              code: 1001,
              message: "User has been successfully deleted"
          });
      }
  } catch (err) {
      next(err);
  }
};

const findOnePost = async (req, res, next) => {
  try {
    const data = { ...req.params };
    const result = await postService.findOnePost(data);
    if (result.message && result.stack) {
      throw result;
    } else if (result.length == 0) {
      return res.status(404).send({
        code: 2002,
        message: "Record not found",
      });
    } else {
      return res.status(200).send(result);
    }
  } catch (error) {
    next(error);
  }
};

const findAllPostsByUser = async (req, res, next) => {
  try {
    const data = {
      user_id: req.params.id,
      order: req.query.order,
      by: req.query.by,
      page: req.query.page,
      perPage: req.query["per-page"],
    };
    console.log("control==>",data)

    const result = await postService.findAllPostsByUser(data);
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
  createPost,
  updatePost,
  deletePost,
  findOnePost,
  findAllPostsByUser
};
