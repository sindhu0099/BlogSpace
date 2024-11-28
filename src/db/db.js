const mysql = require("mysql2");
const config = require("../config/dbconfig");

let pool = mysql.createPool(config.db);

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.log("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.log("Database connection was refused.");
    }
    if (err.code == "ENOTFOUND" || "ER_ACCESS_DENIED_ERROR") {
      console.log("MYSQL connection was failed.");
    }
  }

  if (connection) connection.release();
  return;
});

module.exports = pool;
