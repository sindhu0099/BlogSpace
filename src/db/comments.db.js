const db = require("./db");

const createComment = async (data) => {
  try {
    const query = "INSERT INTO comments SET ?";
    const result = await db.promise().query(query, data);
    return result;
  } catch (error) {
    return error;
  }
};

const deleteComment = async (id) => {
  try {
    const query = "DELETE FROM comments WHERE id =?";
    const result = await db.promise().query(query, id);
    return result;
  } catch (error) {
    return error;
  }
};

const findAllCommentsByPost = async(query,values) => {
  try {
    const result = await db.promise().query(query, values);
    return result[0];
  } catch (error) {
    return error;
  }
}

module.exports = {
  createComment,
  deleteComment,
  findAllCommentsByPost
};
