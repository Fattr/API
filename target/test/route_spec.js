(function() {
  var app, clearDB, dbURI, expect, mongoose, request, user;

  request = require('supertest');

  expect = require('expect.js');

  mongoose = require('mongoose');

  app = require('../server');

  dbURI = 'mongodb://127.0.0.1/app';

  user = require('../models/user');

  clearDB = require('mocha-mongoose')(dbURI);

  expect = require('expect.js');

  describe("Auth without API key", function() {
    it("Should get hello world", function(done) {
      return request(app).get('/').expect(200).end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('test');
        expect(res.body.test).to.be.a('string');
        return done();
      });
    });
    it("Should not be able to POST /login without api key", function(done) {
      return request(app).post('/login').expect(401).end(function(err, res) {
        expect(err).to.be(null);
        return done();
      });
    });
    it("Should not be able to POST /signup without api key", function(done) {
      return request(app).post('/users').expect(401).end(function(err, res) {
        expect(err).to.be(null);
        return done();
      });
    });
    it("Should not be able to GET users without api key", function(done) {
      return request(app).get('/users').expect(401).end(function(err, res) {
        expect(err).to.be(null);
        return done();
      });
    });
    it("Should not be able to GET a user without api key", function(done) {
      return request(app).get('/users/123').expect(401).end(function(err, res) {
        expect(err).to.be(null);
        return done();
      });
    });
    return it("Should not be able to DELETE user without api key", function(done) {
      return request(app).del('/users/123').expect(401).end(function(err, res) {
        expect(err).to.be(null);
        return done();
      });
    });
  });

  describe('Auth with API Key', function() {
    beforeEach(function(done) {
      if (mongoose.connection.db) {
        return done();
      }
      return mongoose.connect(dbURI, done);
    });
    return describe('Sign up new user', function() {
      return it("Should be able to POST /login with api key", function(done) {
        return request(app).post('/users').set('apikey', 'myKey').end(function(err, res) {
          expect(err).to.be(null);
          return done();
        });
      });
    });
  });

}).call(this);

/*
//# sourceMappingURL=../../target/route_spec.js.map
*/