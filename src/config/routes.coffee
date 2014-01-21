# routes for API and DB endpoints
helper = require './routeHelpers'
checkAPIKey = require('./apiConfig')['checkApiKey']

module.exports = (app) ->
  app.get '/', helper.index

  app.post '/login', checkAPIKey, helper.login
  app.post '/logout', checkAPIKey, helper.logout

  app.get '/users', checkAPIKey, helper.test, helper.getAll
  app.post '/users', checkAPIKey, helper.signup

  app.get '/users/:id', checkAPIKey, helper.getUser
  app.delete '/users/:id', checkAPIKey, helper.deleteUser
  app.put '/users/:id', checkAPIKey, helper.linkUserWithAuth
