# call backs for the routes

userUser = require '../models/user'
Stats = require '../models/stat'

# fitbit auth here here fitbit-js

module.exports =
  index: (req, res) ->
    res.json 'test': 'hello world'

  test: (req, res) ->
    console.log 'test user', req.user
    res.json(req.user)