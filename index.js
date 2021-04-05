const express = require("express");
const mongoose = require("mongoose");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const port = process.env.PORT || 9000;

app.use(cors());
app.use(helmet());
app.use(express.json());

// Setting ENV Vars to provess.env
require('dotenv').config()

/* Mongoose Connection */
async function connectToMongo(){
  await mongoose.connect(`${process.env.MONGO_URL}/testdb`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await mongoose.connection.on("error", (err) => {
    console.log("err", err);
  });

  await mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected");
  });
}

connectToMongo().catch(console.log);

app.get("/", (req, res) => {
  res.send({message: 'ok'})
})

app.use("/public", express.static(__dirname + "/public"));
app.use("/api/v1/queries", require("./modules/queries/index"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
