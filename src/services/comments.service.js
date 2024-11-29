const commentDb = require("../db/comments.db");

const createComment = async (data) => {
  try {
    const comment = {
      post_id: data.post_id,
      user_id: data.user_id,
      comments: data.comments,
      created_at: new Date(),
    };
    const result = await commentDb.createComment(comment);
    return result;
  } catch (error) {
    return error;
  }
};

const deleteComment = async (data) => {
  try {
    const result = await commentDb.deleteComment(data.id);
    return result;
  } catch (error) {
    return error;
  }
};

const findAllCommentsByPost = async (data) => {
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
      `SELECT CO.*,PO.id AS post_id FROM comments CO
LEFT JOIN posts PO ON PO.id = CO.post_id WHERE CO.post_id =${data.post_id}` +
      sqlConditions +
      orderBy +
      limit +
      offset;

    const result = await commentDb.findAllCommentsByPost(sql, values);

    if (result.message && result.stack) {
      throw result;
    } else if (result.length == 0) {
      return result;
    } else {
      const qry =
        `SELECT CO.*,PO.id AS post_id FROM comments CO
LEFT JOIN posts PO ON PO.id = CO.post_id WHERE CO.post_id = ${data.post_id}  ` +
        sqlConditions;

      const count = await commentDb.findAllCommentsByPost(qry, values);
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
  createComment,
  deleteComment,
  findAllCommentsByPost,
};
