const db = require("./db");

const create = async (data) => {
  try {
    const query = "INSERT INTO users SET ?";
    const result = await db.promise().query(query, data);
    return result;
  } catch (error) {
    return error;
  }
};

const update = async (data, id) => {
  try {
    const query = "UPDATE users SET ? WHERE ID =?";
    const result = await db.promise().query(query, [data, id]);
    return result;
  } catch (error) {
    return error;
  }
};

const findOneUser = async (id) => {
  try {
    const query = "SELECT * FROM users WHERE id =?";
    const result = await db.promise().query(query, id);
    if (result.length > 0) {
      return result[0];
    }
    return result[0];
  } catch (error) {
    return error;
  }
};

const findAllUser = async (query,values) => {
    try {
        const result = await db.promise().query(query,values);
        if(result.length > 0) {
            return result[0];
        }
        return result;
    } catch (error) {
        return error; 
    }
}

module.exports = {
  create,
  update,
  findOneUser,
  findAllUser
};
