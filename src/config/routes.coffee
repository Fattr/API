# routes for API and DB endpoints
helper = require './routeHelpers'
checkAPIKey = require './apiKey'

module.exports = (app) ->
  app.get '/', helper.index
  app.get '/users/:id', checkAPIKey, helper.getOne
  app.post '/signup', checkAPIKey, helper.signup