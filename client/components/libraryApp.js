import React, { Component } from 'react';
import request from "superagent";

class LibraryApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      books: [],
      author: "",
      title: ""
    }
  }

  componentWillMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    request
      .get("http://localhost:3000/api/books")
      .then((res) => {
        console.log("books", res);
        this.setState({
          books: res.body
        })
      }).catch((err) => {
        console.log("err", err);
      })
  }

  handleClick = (book) => {
    request
      .post("http://localhost:3000/api/tweets")
      .send({message: `Test tweet for ${book.title} by ${book.author}`})
      .then((res) => {
        console.log("burrow response", res);
      }).catch((err) => {
        console.log("err", err);
      })
  }

  handleSubmit = (event, value) => {
    event.preventDefault();
    request
      .post("http://localhost:3000/api/books")
      .send({title: this.state.title, author: this.state.author})
      .then((res) => {
        console.log("add response", res);
        this.fetchBooks()
        this.setState({
          title: "",
          author: ""
        })
      }).catch((err) => {
        console.log("err", err);
      })
  }

  render() {
    return (
      <div>
        <div className="text-center" style={{ paddingTop: 10, paddingBottom: 10}}>
          <h4>Library App </h4>
        </div>
        <hr/>
        <div className="jumbotron" style={{marginRight: 100, marginLeft:100}}>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                className="form-control"
                onBlur={(event)=> {
                  console.log("value", event.target.value)
                  this.setState({
                    title: event.target.value
                  })
                }}
                placeholder="Enter book title"/>
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name of book author"
                onBlur={(event)=> {
                  console.log("value", event.target.value)
                  this.setState({
                    author: event.target.value
                  })
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="row" style={{marginBottom: 20}}>
          {this.state.books.map((book) => (
            <div className="col" key={book._id} style={{margin: 10}}>
              <div className="card" style={{ width: "20rem" }}>
                <div className="card-body">
                  <h4 className="card-title">{book.title}</h4>
                  <p className="card-text">{book.author}</p>
                  <button className="btn btn-primary" onClick={() => this.handleClick(book)}>Borrow</button>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    );
  }
}

export default LibraryApp;