request = require 'supertest'
expect = require 'expect.js'
mongoose = require 'mongoose'
app = require '../server.coffee'
dbURI = 'mongodb://localhost/app'
user = require '../models/user.coffee'
clearDB = require('mocha-mongoose')(dbURI)
expect = require 'expect.js'

describe "connect to db", ->
  beforeEach (done) ->
    return done()  if mongoose.connection.db
    mongoose.connect dbURI, done

  it "can be saved", (done) ->
    new user(email: 'test@test.com').save done

  it



# describe('Server', () ->
#   before (done) ->
#     mongoose.connect dbURI, () ->
#       mongoose.connection.db.dropDatabase done

#   describe('GET hello world', () ->
#     it('return hello world', (done) ->
#       request(app)
#       .get('/')
#       .expect(200, done)
#     )
#   )
# )



# request(app)
#   .get('/')
#   .expect('Content-Type', /json/)
#   .expect(200)
#   .end (err, res) ->
#     throw err if err
