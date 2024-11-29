const jwt = require("jsonwebtoken");

const generateAccessToken = function (user) {
  return jwt.sign(user, "qwertyuiop", {
    expiresIn: 10 * 60 * 60,
  });
};

const generateRefereshToken = function (user) {
  return jwt.sign(user, "asdfghjkl", {
    expiresIn: 60 * 60 * 24 * 7,
  });
};

const authenticateToken = function (req, res, next) {
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, "qwertyuiop", (err, user) => {
      if (err) {
        if (err.name == "JsonWebTokenError" || "TokenExpiredError") {
          res.status(401).json({
            code: 401,
            message: "Unauthorized",
          });
        }
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json({
      code: 401,
      message: "Unauthorized",
    });
  }
};

module.exports = {
  generateAccessToken,
  authenticateToken,
  generateRefereshToken,
};
