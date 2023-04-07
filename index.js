const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config({
  path: "./.env",
});
const cors = require("cors");
const routes = require("./routes");
const { MONGO_URI, PORT } = process.env;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/", routes);

mongoose
  .connect(MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((resp) => {
    console.log("Successfully connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT, function () {
  console.log(`SERVER LISTENING : ${PORT}`);
});
