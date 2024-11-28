const userDb = require("../db/users.db");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../middlewares/authentication");

const createUser = async (data) => {
  try {
    let password = await bcrypt.hash(data.password, 10);

    const user = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      password: password,
      email: data.email,
      created_at: new Date(),
    };

    const result = await userDb.create(user);

    return result;
  } catch (error) {
    return error;
  }
};

const updateUser = async (data) => {
  try {
    const user = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      password: data.password,
      email: data.email,
      updated_at: new Date(),
    };
    if (data.password && data.password !== "") {
      // Encrypt password
      let password = "";
      try {
        password = await bcrypt.hash(data.password, 10);
      } catch (error) {
        throw error;
      }

      user.password = password;
    }
    const result = await userDb.update(user, data.id);
    return result;
  } catch (error) {
    return error;
  }
};

const findOneUser = async (data) => {
  try {
    const result = await userDb.findOneUser(data.id);
    if (result.message && result.stack) {
      throw result;
    } else if (result.length == 0) {
      return result;
    } else {
      const finalResult = result.map((ele) => {
        return {
          id: ele.id,
          first_name: ele.first_name,
          last_name: ele.last_name,
          phone: ele.phone,
          email: ele.email,
        };
      });
      return finalResult[0];
    }
  } catch (error) {
    return error;
  }
};

const findAllUser = async (data) => {
  try {
    const conditions = [];
    const values = [];

    if (
      data.query1 &&
      data.query2 != "" &&
      data.query1 != undefined &&
      data.query2 != undefined
    ) {
      conditions.push("CONCAT(first_name, ' ', last_name)=?");
      values.push(data.query1 + " " + data.query2);
    } else {
      if (data.query1 && data.query1 !== "") {
        conditions.push(
          "first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone = ?"
        );
        values.push(
          data.query1 + "%",
          data.query1 + "%",
          data.query1 + "%",
          data.query1
        );
      }

      if (data.query2 && data.query2 !== "") {
        conditions.push("last_name LIKE ?");
        values.push(data.query2 + "%");
      }
    }

    let orderBy = "";
    if (data.order && data.order !== "" && data.by && data.by !== "") {
      orderBy = " ORDER BY " + data.order + " " + data.by;
    }

    let limit = "";
    if (data.perpage && data.perpage !== "") {
      limit = " LIMIT " + data.perpage;
    }

    let offset = "";
    if (data.page && data.page !== "") {
      offset = " OFFSET " + (data.page - 1) * data.perpage;
    }

    let sqlConditions = conditions.length ? conditions.join(" AND ") : "";
    sqlConditions = sqlConditions ? " WHERE " + sqlConditions : "";

    let sql = "SELECT * FROM users" + sqlConditions + orderBy + limit + offset;

    let result = await userDb.findAllUser(sql, values);
    F;
    if (result.message && result.stack) {
      throw result;
    } else if (result.length == 0) {
      return result;
    } else {
      let sql = `SELECT COUNT(*) AS COUNT FROM users` + sqlConditions;
      let count = await userDb.findAllUser(sql, values);
      if (count.message && count.stack) {
        throw count;
      } else {
        let totalCount = count[0].COUNT;
        let totalPageCount = Math.ceil(totalCount / data.perpage);

        let finalResult = result.map((element) => {
          return {
            ...element,
            created_at: moment(element.created_at).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            updated_at: element.updated_at
              ? moment(element.updated_at).format("YYYY-MM-DD HH:mm:ss")
              : null,
          };
        });
        return {
          result: finalResult,
          totalcount: totalCount,
          totalpagecount: totalPageCount,
          COUNT: count[0].COUNT,
        };
      }
    }
  } catch (error) {
    return error;
  }
};

const deleteUser = async (data) => {
  try {
      const result = await userDb.deleteUser(data.id);
      if (result.message && result.stack) {
          throw result;
      } else {
          return result;
      }
  } catch (error) {
      return error;
  }
};

const createLogin = async (data) => {
  try {
    const identity = data.identity;
    const password = data.password;

    const results = await userDb.checkIdentity(identity);
    if (results.message && results.stack) {
      throw results;
    } else if (results.length == 0) {
      return results;
    } else {
      let passwordCompare = await bcrypt.compare(password, results[0].password);
      if (passwordCompare == true) {
        const username = results[0].first_name + " " + results[0].last_name;
        const id = results[0].id;
        const user = {
          name: username,
          id: id,
        };

        const accessToken = generateAccessToken(user);
        return accessToken;
      } else {
        const error = {
          code: 2002,
          message: "This is an incorrect password",
        };
        return error;
      }
    }
  } catch (error) {
    return error;
  }
};

module.exports = {
  createUser,
  updateUser,
  findOneUser,
  findAllUser,
  deleteUser,
  createLogin,
};
