const express = require("express");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("./database");

const app = express();

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
