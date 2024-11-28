// const env = process.env;

const config = {
    db: {
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        // host: env.MYSQL_DB_HOST,
        // user: env.MYSQL_DB_USER,
        // password: env.MYSQL_DB_PASSWORD,
        // database: env.MYSQL_DB_NAME
        host:"localhost",
        user: "root",
        password: "Admin@123",
        database: "blog"
    }
  
};

module.exports = config;
