const express = require("express");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("./database");

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//settings
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(morgan("dev"));
app.use(express.json());

//ruotes
app.use("/api/animals", require("./routes/farm-animals.routes"));
app.use("/api/type-animals", require("./routes/type-animals.routes"));
app.use("/api/type-device", require("./routes/type-device.routes"));

//Starting the server
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
