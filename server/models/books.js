const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BooksSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: String,
  borrowed: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("Books", BooksSchema);