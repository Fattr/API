# routes for API and DB endpoints
helper = require './routeHelpers'
checkAPIKey = require('./apiConfig')['checkApiKey']

module.exports = (app) ->
  app.get '/', helper.index

  app.post '/login', checkAPIKey, helper.login

  app.get '/users', checkAPIKey, helper.getAll
  app.post '/users', checkAPIKey, helper.signup

  app.get '/users/:id', checkAPIKey, helper.getOne