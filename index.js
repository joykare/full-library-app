const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Books = require("./server/models/books");
const seed = require("./utils/seed.js");
const routes = require("./server/routes/books.js");
require("dotenv").config()
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

routes(app);

const DB_URI = "mongodb://localhost/library";

mongoose.connect(DB_URI, function (err) {
  if (err) throw err;
  console.log("Successfull db connection on", DB_URI);
})

mongoose.connection.on("connected", function(err) {
  Books.remove({}, function() {
    if (err) {
      console.log(err);
    } else {
      console.log("Books deleted");
    }
  });

  Books.create(seed.books, function() {
    if (err) {
      console.log(err);
    } else {
      console.log("Books created");
    }
  });
})

app.listen(3000, function() {
  console.log("App is listening on port 3000")
});

module.exports = app;