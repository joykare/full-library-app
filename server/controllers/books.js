const Books = require("../models/books.js");

module.exports = {
  add: (req, res) => {
    let book = new Books();

    book.title = req.body.title;
    book.author = req.body.author;

    book.save((err, book) => {
      if (err) {
        return res.status(500).send({
          message: err
        });
      } else {
        res.status(200).send({
          message: "Book saved in library collection"
        });
      }
    });
  },
  find: (req, res) => {
    Books.find({}, (err, books) => {
      if(err) {
        return res.status(500).send({
          message: "Error occured while finding"
        });
      }
      res.status(200).send(books);
    })
  }
}