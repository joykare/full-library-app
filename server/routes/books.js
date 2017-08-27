const books = require("../controllers/books.js");

const routes = (app) => {
  app.get("/api/books", books.find);
  app.post("/api/books", books.add);
  app.post("/api/tweets", books.tweet);
  app.get("/api/tweets", books.getTweets);
}

module.exports = routes;