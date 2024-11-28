const express = require("express");
const router = express.Router();

router.use("/users", require("./users.route"));
router.use("/posts", require("./posts.route"));
router.use("/comments", require("./comments.route"));

module.exports = router;
