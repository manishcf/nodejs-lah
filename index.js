const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const port = 9000;
app.use(cors());
app.use(helmet());
app.use(express.json());

const mongoose = require("mongoose");

/* Mongoose Connection */
mongoose.connect("mongodb://localhost:27017/testdb", {
  useNewUrlParser: "true",
});

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

app.use("/public", express.static(__dirname + "/public"));
app.use("/api/v1/queries", require("./modules/queries/index"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
