const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const DB_URI = "mongodb://localhost/library";

mongoose.connect(DB_URI, function (err) {
  if (err) throw err;
  console.log("Successfull db connection on", DB_URI);
})

app.listen(3000, function() {
  console.log("App is listening on port 3000")
});

module.exports = app;