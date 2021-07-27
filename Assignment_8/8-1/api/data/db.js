const mongoose = require("mongoose");
require("./games.model");

const dbName = process.env.DBNAME;
const dbUrl = process.env.DBURL + dbName;
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(dbUrl);

mongoose.connection.on("connected", function () {
  console.log("Mongoose connected to", dbUrl);
});
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected");
});
mongoose.connection.on("error", function (err) {
  console.log("Mongoose Error", err);
});

process.on("SIGTERM", function () {
  //or SIGINT
  mongoose.connection.close(function () {
    console.log("Mongooes disconnected by app termination");
    process.exit(0);
  });
});
process.on("SIGUSR2", function () {
  mongoose.connection.close(function () {
    console.log("Mongooes disconnected by app restart");
    process.kill(process.pid, "SIGUSR2");
  });
});
