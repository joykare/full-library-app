const request = require("supertest");
const app = require("../index.js");
const expect = require("chai").expect;


describe("Sever methods test", () => {
  it("tests find books method", (done) => {
    request(app)
      .get("/api/books")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.exist;
        done();
      })
  })

  it("tests add book method", (done) => {
    request(app)
      .post("/api/books")
      .send({title: "Test", author: "Westy"})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.exist;
        expect(res.body.message).to.equal("Book saved in library collection")
        done();
      })
  })

  it("tests tweet method", (done) => {
    request(app)
      .post("/api/tweets")
      .send({message: "Ola ba"})
      .end((err, res) => {
        expect(res).to.exist;
        expect(res.statusCode).to.equal(200);
        done();
      })
  })


})