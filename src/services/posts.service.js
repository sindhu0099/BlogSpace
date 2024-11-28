const postDb = require("../db/posts.db");

const createPost = async (data) => {
  try {
    const post = {
      user_id: data.user_id,
      title: data.title,
      content: data.content,
      created_at : new Date(),
    };
    const result = await postDb.createPost(post);
    return result;
  } catch (error) {
    return error;
  }
};

const updatePost = async (data) => {
  try {
    const post = {
      title: data.title,
      content: data.content,
      updated_at: new Date(),
    };
    const result = await postDb.updatePost(post, data.id);
    return result;
  } catch (error) {
    return error;
  }
};

const deletePost = async (data) => {
  try {
      const result = await postDb.deletePost(data.id);
      if (result.message && result.stack) {
          throw result;
      } else {
          return result;
      }
  } catch (error) {
      return error;
  }
};

const findOnePost = async (data) => {
  try {
    const result = await postDb.findOnePost(data.id);
    if (result.message && result.stack) {
      throw result;
    } else if (result.length == 0) {
      return result;
    } else {
      const finalResult = result.map((ele) => {
        return {
         ...ele
        };
      });
      return finalResult[0];
    }
  } catch (error) {
    return error;
  }
};

const findAllPostsByUser = async (data) => {
  try {
    const conditions = [];
    const values = [];

    let orderBy = "";
    if (data.order && data.order !== "" && data.by && data.by !== "") {
      orderBy = " ORDER BY " + data.order + " " + data.by;
    }

    let limit = "";
    if (data.perPage && data.perPage !== "") {
      limit = " LIMIT " + data.perPage;
    }

    let offset = "";
    if (data.page && data.page !== "") {
      offset = " OFFSET " + (data.page - 1) * data.perPage;
    }

    let sqlConditions = conditions.length ? conditions.join(" AND ") : "";
    sqlConditions = sqlConditions ? " WHERE " + sqlConditions : "";

    const sql =
      `SELECT PO.*,US.id FROM posts PO
LEFT JOIN users US ON US.id = PO.user_id WHERE PO.user_id = ?` +
      sqlConditions +
      orderBy +
      limit +
      offset;
    console.log(sql);
    const result = await postDb.findAllPostsByUser(sql, values);

    if (result.message && result.stack) {
      throw result;
    } else if (result.length == 0) {
      return result;
    } else {
      const qry =
        `SELECT PO.*,US.id FROM posts PO
LEFT JOIN users US ON US.id = PO.user_id WHERE PO.user_id = ?` + sqlConditions;

      const count = await postDb.findAllPostsByUser(qry, values);
      if (count.message && count.stack) {
        throw count;
      } else {
        const totalCount = count.length;
        const totalPageCount = Math.ceil(totalCount / data.perPage);

        const finalResult = result.map((element) => {
          return {
            ...element,
          };
        });
        return {
          finalResult: finalResult,
          totalCount: totalCount,
          totalPageCount: totalPageCount,
          COUNT: count[0].COUNT,
        };
      }
    }
  } catch (error) {
    return error;
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  findOnePost,
  findAllPostsByUser,
};
