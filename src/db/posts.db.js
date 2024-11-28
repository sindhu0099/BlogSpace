const db = require("./db");

const createPost = async (data) => {
  try {
    const query = "INSERT INTO posts SET ?";
    const result = await db.promise().query(query, data);
    return result;
  } catch (error) {
    return error;
  }
};

const updatePost = async (data, id) => {
  try {
    const query = "UPDATE posts SET ? WHERE ID =?";
    const result = await db.promise().query(query, [data, id]);
    return result;
  } catch (error) {
    return error;
  }
};

const deletePost = async (id) => {
  try {
    const query = "DELETE FROM posts WHERE id = ?";
    const result = await db.promise().query(query, id);
    return result;
  } catch (err) {
    return err;
  }
};

const findOnePost = async (id) => {
    try {
      const query = "SELECT * FROM posts WHERE id =?";
      const result = await db.promise().query(query, id);
      if (result.length > 0) {
        return result[0];
      }
      return result[0];
    } catch (error) {
      return error;
    }
  };

const findAllPostsByUser = async (query, values) => {
  try {
    const result = await db.promise().query(query, values);
    if (result.length > 0) {
      return result[0];
    }
    return result;
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
