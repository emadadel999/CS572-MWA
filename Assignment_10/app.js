const express = require("express");
require("dotenv").config();
require("./api/data/db");
const path = require("path");

const router = require("./api/routes");
const app = express();

app.use("/node", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(process.env.PUBLIC_FOLDER));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", router);

const server = app.listen(process.env.PORT, function () {
  console.log("Listening to port", server.address().port);
});
