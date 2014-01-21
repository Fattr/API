request = require 'supertest'
expect = require 'expect.js'
mongoose = require 'mongoose'
app = require '../server.coffee'
dbURI = 'mongodb://127.0.0.1/app'
user = require '../models/user.coffee'
clearDB = require('mocha-mongoose')(dbURI)
expect = require 'expect.js'

describe "Auth without API key", ->
  # beforeEach (done) ->
  #   return done()  if mongoose.connection.db
  #   mongoose.connect dbURI, done

  it "Should get hello world", (done) ->
    request(app).get('/').expect(200).end (err, res) ->
      expect(err).to.eql null
      expect(res.body).to.have.property 'test'
      expect(res.body.test).to.be.a 'string'
      do done

  it "Should not be able to POST /login without api key", (done) ->
    request(app).post('/login').expect(401).end (err, res) ->
      expect(err).to.be null
      do done

  it "Should not be able to POST /signup without api key", (done) ->
    request(app).post('/users').expect(401).end (err, res) ->
      expect(err).to.be null
      do done

  it "Should not be able to GET users without api key", (done) ->
    request(app).get('/users').expect(401).end (err, res) ->
      expect(err).to.be null
      do done


  it "Should not be able to GET a user without api key", (done) ->
    request(app).get('/users/123').expect(401).end (err, res) ->
      expect(err).to.be null
      do done

  it "Should not be able to DELETE user without api key", (done) ->
    request(app).del('/users/123').expect(401).end (err, res) ->
      expect(err).to.be null
      do done

describe 'Auth with API Key', ->
  beforeEach (done) ->
    return done() if mongoose.connection.db
    mongoose.connect dbURI, done

  describe 'Sign up new user', ->

    it "Should be able to POST /login with api key", (done) ->
      request(app).post('/users').set('apikey', 'myKey').end (err, res) ->
        expect(err).to.be null
        do done

