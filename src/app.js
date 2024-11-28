const express = require("express");
const app = express();

app.use(express.json());

const routes = require("./routes/index");

app.use("/", routes);

let port = 3000;

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});