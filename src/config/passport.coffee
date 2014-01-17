# passport auth stuff here
'use strict'

FacebookStrategy = require('passport-facebook').Strategy
authTokens = require './auth.coffee'
User = require '../models/user.coffee'

module.exports = (passport) ->

  # ===========================
  # passport session config
  # ===========================

  # used for session management
  # http://passportjs.org/guide/configure/

  passport.serializeUser (user, done) ->

    # LOOK INTO
    # possible to only serialize the user.id
    # not the entire user
    console.log 'passport', user
    done null, {'_id': user._id, 'name': user.name}

  passport.deserializeUser (id, done) ->
    User.findById id._id, (err, user) ->
      console.log 'deserializeUser', id
      done err, user

  # ===========================
  # Facebook
  # ===========================

  passport.use new FacebookStrategy(
    # use our facebook app tokens to do oauth handshake

    clientID: authTokens.facebook.clientID
    clientSecret: authTokens.facebook.clientSecret
    callbackURL: authTokens.facebook.callbackUrl,

    # below is the tokens facebook belonging to the
    # user. We must save these on our DB

    (accessToken, refreshToken, profile, done) ->
      process.nextTick () ->

        # chek to see if we already have a user with the
        # same facebook id


        User.findOne('facebook.id': profile.id, (err, user) ->
          done err if err
          if user
            # FIXME
            # don't send back the entire user here
            console.log 'returning user'
            done null, user
          else
            console.log 'new user'
            newUser = new User()
            newUser.facebook.id = profile.id
            newUser.name = profile.displayName
            newUser.username = profile.username
            # FIXME
            # Set the rest of the facebook profile
            # Fields here ex: the tokens!!!!

            newUser.save (err) ->
              if err
                console.log 'err svaing new user', err
                return err
              else
                console.log newUser
                done null, newUser
        )
  )