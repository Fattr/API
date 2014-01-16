# routes for API and DB endpoints
helper = require './routeHelpers.coffee'


module.exports = (app, passport) ->
  app.get '/', helper.index
  app.get '/test', helper.test

  # Facebook auth here
  app.get '/facebook', passport.authenticate 'facebook', (req, res) ->
    res.send req.user

  # Facebook auth callback
  # FIXME:!!!!!!!
  # Add real callback url for front
  app.get '/auth/facebook/callback', passport.authenticate 'facebook',
  successRedirect: 'https://www.google.com'
  failureRedirect: 'https://www.yahoo.com'