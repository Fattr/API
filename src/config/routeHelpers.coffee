# call backs for the routes

userUser = require '../models/user.coffee'
Stats = require '../models/stat.coffee'
config = require './auth.coffee'
# fitbit auth here here fitbit-js

module.exports =
  index: (req, res) ->
    res.json 'test': 'hello world'

  test: (req, res) ->
    res.json(req.user)