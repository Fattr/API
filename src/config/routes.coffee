# routes for API and DB endpoints
helper = require './routeHelpers'


module.exports = (app) ->
  app.get '/', helper.index
  app.get '/test', apiKey, helper.test

  app.post '/signup', apiKey, helper.signup

apiKey = (req, res, next) ->
  console.log req.headers
  console.log 'key', req.headers.apikey
  if req.headers.apikey != 'myKey'
    console.log 'wrong key'
    res.send 500
  else
    next()