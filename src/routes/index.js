const express = require("express");
const router = express.Router();

router.use("/users",require("./users.route"));

// const { logError } = require("../logger/logger");

// // error handling

// router.use((err, req, res, next) => {
//   logError(err);
//   return res.status(400).json({
//     error: err.message,
//   });
// });

module.exports = router;
