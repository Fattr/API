request = require 'supertest'
app = require '../server.coffee'


describe('Server', () ->
  describe('GET hello world', () ->
    it('return hello world', (done) ->
      request(app)
      .get('/')
      .expect(200, done)
    )
  )
)



# request(app)
#   .get('/')
#   .expect('Content-Type', /json/)
#   .expect(200)
#   .end (err, res) ->
#     throw err if err
