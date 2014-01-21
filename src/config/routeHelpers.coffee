# call backs for the routes

User    = require '../models/user'
Stats   = require '../models/stat'
Session = require '../models/session'
apiUrl  = require('./apiConfig')['url']
bcrypt  = require 'bcrypt-nodejs'
uuid    = require 'node-uuid'
fitbit  = require('fitbit-js')('6b8b28e0569a422e97a70b5ca671df32',
                              'b351c1fea45d48ed9955a518f4e30e72',
                      'http://127.0.0.1:5000/auth/fitbit/callback')


module.exports =
  test: (req, res, next) ->
    console.log req.headers
    next()

  # TO-DO: DECIDE WHAT INDEX ROUTE SHOULD RETURN
  index: (req, res) ->
    res.json 'test': 'hello world'

  signup: (req, res) ->
    email = req.body.email
    password = req.body.password
    User.findOne('email': email, (err, user) ->
      if err
        console.error 'err', err
        res.send 500
      if user
        # user is already signed up, set location header to login route
        # redirect link for front end to utilize.
        res.setHeader "location", "#{apiUrl}/login"
        res.send 409 # conflict error
      if not user
        # new user sign up
        # create new access_token
        newSession = new Session()
        newSession._access_token = uuid.v4()

        newUser = new User()
        newUser.email = email

        bcrypt.genSalt 10, (err, salt) ->
          if err
            console.error 'bcrypt.genSalt error: ', err
            res.send 500
          bcrypt.hash password, salt, null, (err, hash) ->
            if err
              console.error 'bcrypt.hash error: ', err
              res.send 500
            newUser.password = hash
            newUser.save (err) ->
              if err
                console.error 'error - could not save user ', err
                res.send 500
              res.setHeader "location", "#{apiUrl}/users/#{newUser._id}"
              responseJSON = {}
              responseJSON.createdAt = newUser.createdAt
              responseJSON._id = newUser._id
              # TO-DO: IMPLEMENT ACCESS TOKENS
              newSession._userId = newUser._id
              newSession.save (err) ->
                if err
                  console.log 'failed: could notsave session', err
                  res.send 500
                responseJSON._access_token = newSession._access_token
                res.json 201, responseJSON
    )

  login: (req, res) ->
    email = req.body.email
    password = req.body.password
    User.findOne('email': email, (err, user) ->
      if err
        console.error 'Mongo findOne error ', err
        res.send 500
      if not user
        # email is incorrect
        res.send 401
      else
        bcrypt.compare password, user.password, (err, same) ->
          if err
            console.error 'bcrypt.compare error ', err
            res.send 500
          else if not same
            # password is incorrect
            res.send 401
          else
            responseJSON = {}
            responseJSON._id = user._id
            responseJSON.createdAt = user.createdAt
            res.setHeader "location", "#{apiUrl}/users/#{user._id}"
            session = new Session()
            session._userId = user._id
            session._access_token = uuid.v4()
            session.save (err) ->
              if err
                # make logout route to fix the error
                # logout should delete the session
                # one user can not have more than one session
                console.log 'could not make session in log in', err
                res.send 500
              responseJSON._access_token = session._access_token
              res.json responseJSON
    )

  logout: (req, res) ->
    user_id = req.body._id
    Session.findOne('_userId': user_id, (err, session) ->
      if err
        console.log 'err finding session to log out', err
        res.send 500
      session.remove (err, sesh) ->
        if err
          console.log 'err removing session logout'
          res.send 500
        res.send 204, sesh
    )

  getUser: (req, res) ->
    id = req.params.id
    User.findOne('_id': id, (err, user) ->
      if err
        console.error 'User.findOne error ', err
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
        console.error 'User.find error', err
        res.send 500
      res.json users
    )

  deleteUser: (req, res) ->
    email = req.body.email
    password = req.body.password
    id = req.params.id
    User.findOne({'_id':id, 'email':email}, (err, user) ->
      if err
        console.error 'User.findOne error', err
        res.send 500
      if not user
        # user is not in DB anyways..
        res.send 204
      else
        bcrypt.compare password, user.password, (err, same) ->
          if err
            console.error 'bcrypt.compare error ', err
            res.send 500
          else if not same
            # password is incorrect
            res.send 401
          else
            user.remove (err, user) ->
              if err
                console.error 'user.remove error ', err
                res.send 500
              res.json 204, user
    )

  linkUserWithAuth: (req, res) ->
    email = req.body.email
    password = req.body.password
    authData = JSON.parse req.body.authData
    id = req.params.id
    User.findOne({'_id':id, 'email':email}, (err, user) ->
      if err
        console.error 'User.findOne error', err
        res.send 500
      if not user
        # user is not in DB
        res.send 204
      else
        bcrypt.compare password, user.password, (err, same) ->
          if err
            console.error 'bcrypt.compare error', err
            res.send 500
          else if not same
            # password is incorrect
            res.send 401
          else
            if typeof authData.facebook is 'object' # handles null as well
              user.set("authData.facebook", authData.facebook)
            if typeof authData.twitter is 'object' # handles null as well
              user.set("authData.twitter", authData.twitter)
            user.save (err) ->
              if err
                console.error 'err', err
                res.send 500
              res.setHeader "location", "#{apiUrl}/users/#{user._id}"
              res.json user
    )

  fitbitTokens: (req, res) ->
    fitbit.getAccessToken(req, res, (err, newToken) ->
      if newToken
        console.log 'new token', token
        res.send 200
    )

  fitbitCallback: (req, res) ->
    console.log 'got them tokens'
    res.send req.params
