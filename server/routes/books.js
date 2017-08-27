const books = require("../controllers/books.js");

const routes = (app) => {
  app.get("/api/books", books.find);
  app.post("/api/books", books.add);
}

module.exports = routes;