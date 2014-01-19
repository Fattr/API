# call backs for the routes

User = require '../models/user'
Stats = require '../models/stat'
Session = require '../models/session'
apiUrl = require('./apiConfig')['url']

module.exports =

  # TO-DO: DECIDE WHAT INDEX ROUTE SHOULD RETURN
  index: (req, res) ->
    res.json 'test': 'hello world'

  signup: (req, res) ->
    email = req.body.email
    password = req.body.password
    User.findOne('email': email, (err, user) ->
      if err
        console.log 'err', err
        res.send 500
      if user
        #user is already signed up, set location header to login route
        res.setHeader "location", "#{apiUrl}/login"
        res.send 204
      if not user
        # new user sign up
        newUser = new User()
        newUser.email = email
        newUser.password = newUser.generateHash password

        newUser.save (err) ->
          if err
            console.log 'err', err
            res.send 500
          res.setHeader "location", "#{apiUrl}/users/#{newUser._id}"
          res.send(201)
    )

  login: (req, res) ->
    email = req.body.email
    password = req.body.password
    User.findOne('email': email, (err, user) ->
      if err
        console.log 'err', err
        res.send 500
      if (not user or not user.validPassword(password))
        # email or password is incorrect
        res.send 401
      else
        res.setHeader "location", "#{apiUrl}/users/#{user._id}"
        res.json user
    )

  getOne: (req, res) ->
    id = req.params.id
    User.findOne('_id': id, (err, user) ->
      if err
        console.log 'err', err
        res.send 500
      if not user
        # user isn't in the db
        res.send 204
      if user
        res.json user 
    )

  getAll: (req, res) ->
    id = req.params.id
    User.find((err, users) ->
      if err
        console.log 'err', err
        res.send 500
      res.json users
    )
