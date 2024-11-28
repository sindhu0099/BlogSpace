const userService = require("../services/users.service");

const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await userService.createUser(data);
    if (result.message && result.stack) {
      throw result;
    } else {
      return res.status(201).send({
        code: 1001,
        message: "User has been successfully created",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const data = { ...req.body, ...req.params };
    const results = await userService.updateUser(data);
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
        message: "User has been successfully updated",
      });
    }
  } catch (error) {
    next(error);
  }
};

const findOneUser = async (req, res, next) => {
  try {
    const data = { ...req.params };
    const result = await userService.findOneUser(data);
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

const findAllUser = async (req, res, next) => {
  try {
    const phrase = req.query.query;
    const splitPhrase = phrase ? phrase.split(" ") : phrase;
    const firstquery = splitPhrase ? splitPhrase[0] : splitPhrase;
    const secondquery = splitPhrase ? splitPhrase[1] : splitPhrase;
    const data = {
      query1: firstquery,
      query2: secondquery,
      order: req.query.order,
      by: req.query.by,
      page: req.query.page,
      perpage: req.query["per-page"],
    };
    const results = await userService.findAllUser(data);
    if (results.message && results.stack) {
      throw results;
    } else if (results.length == 0) {
      return res.status(200).send(results);
    } else {
      const startRecord = (data.page - 1) * data.perpage + 1;
      const endRecord =
        results.COUNT === data.perpage
          ? data.perpage * data.perpage
          : results.totalcount;

      res.setHeader("X-Pagination-Total-Count", results.totalcount);
      res.setHeader("X-Pagination-Page-Count", results.totalpagecount);
      res.setHeader("X-Pagination-Current-Page", data.page);
      res.setHeader("X-Pagination-Per-Page", data.perpage);
      res.setHeader("X-Pagination-Start-Record", startRecord);
      res.setHeader("X-Pagination-End-Record", endRecord);
      return res.status(200).send(results.result);
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
      const data = { ...req.params };
      const results = await userService.deleteUser(data);
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

const userLogin = async (req, res, next) => {
  try {
      const data = { ...req.body };
      const results = await userService.createLogin(data);
      if (results.message && results.stack) {
          throw results;
      } else if (results.length == 0 || !results) {
          return res.status(404).send({
              code: 2002,
              message: "We cannot find an account with this email or phone"
          });
      } else if (results.code == 401) {
          return res.status(401).send({
              ...results
          });
      } else if (results.code == 2002) {
          return res.status(404).send({
              ...results
          });
      } else {
          return res.status(201).send({
              code: 1001,
              message: "Successful login",
              results
          });
      }
  } catch (error) {
      next(error);
  }
};

module.exports = {
  createUser,
  updateUser,
  findOneUser,
  findAllUser,
  deleteUser,
  userLogin
};
