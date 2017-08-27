const Books = require("../models/books.js");
const OAuth= require("oauth").OAuth;




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
  },
  tweet: (req, res) => {
    const twitterer = new OAuth(
      "https://api.twitter.com/oauth/request_token",
      "https://api.twitter.com/oauth/access_token",
      process.env.CONSUMER_KEY,
      process.env.CONSUMER_SECRET,
      "1.0",
      null,
      "HMAC-SHA1"
    );
    const url = "https://api.twitter.com/1.1/statuses/update.json"
    const body = ({status: req.body.message})
    console.log("body", body, twitterer);

    twitterer
      .post(
        url,
        process.env.ACCESS_TOKEN,
        process.env.ACCESS_SECRET,
        body,
        "application/x-www-form-urlencoded",
        function (error, data, res) {
          if (error) {
            console.log('Error: Something is wrong.\n'+JSON.stringify(error)+'\n');
          } else {
            console.log('Twitter status updated', res);
          }
      });
  },

  getTweets: (req, res) => {
    const twitterer = new OAuth(
      "https://api.twitter.com/oauth/request_token",
      "https://api.twitter.com/oauth/access_token",
      process.env.CONSUMER_KEY,
      process.env.CONSUMER_SECRET,
      "1.0",
      null,
      "HMAC-SHA1"
    );
    const url = "https://api.twitter.com/1.1/statuses/user_timeline.json?count=2";
    twitterer
      .get(
        url,
        process.env.ACCESS_TOKEN,
        process.env.ACCESS_SECRET,
        function (error, data, res) {
          if (error) {
            console.log('Error: Something is wrong.\n'+JSON.stringify(error)+'\n');
          } else {
            console.log('Twitter statuses fetched---->', res);
          }
        }
      )
  }
}