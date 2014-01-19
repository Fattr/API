# call backs for the routes

User = require '../models/user'
Stats = require '../models/stat'
Session = require '../models/session'


# fitbit auth here here fitbit-js

module.exports =
  index: (req, res) ->
    console.log req.headers
    res.json 'test': 'hello world'

  test: (req, res) ->
    console.log 'test user', req.user
    res.json(req.user)

  signup: (req, res) ->
    console.log 'trying to signup'
    credit = req.body
    process.nextTick () ->

      User.findOne('username': credit.username, (err, user) ->
        console.log 'args', arguments
        if err
          console.log 'err', err
          res.send 400

        if user
          console.log 'user is alredy in there, make them redirect to sign up'
          res.send 401

        if not user
          console.log 'new user sign up'

          newUser = new User()
          newUser.username = credit.username
          newUser.password = credit.password

          newUser.save (err) ->
            if err
              console.log 'could not save user'
            res.send 201
      )

  getOne: (req, res) ->
    id = req.params.id
    console.log id
    User.findOne('_id': id, (err, user) ->
      if err
        console.log 'err', err
        res.send 500
      if not user
        console.log "user isn't in the db"
        res.send 204
      if user
        res.json(user)
    )
