# passport auth stuff here
'use strict'

facebookStrategy = require 'passport-facebok'
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

    done null, user

  passport.deserializeUser (id, done) ->
    User.findById id._id, (err, user) ->
      done err, user

  # ===========================
  # Facebook
  # ===========================

  passport.use new facebookStrategy(
    # use our facebook app tokens to do oauth handshake

    clientID: authTokens.facebook.clientID
    clientSecret: authTokens.facebook.clientSecret
    callbackUrl: authTokens.facebook.callbackUrl,

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
            newUser.name = profile.name
            # FIXME
            # Set the rest of the facebook profile
            # Fields here ex: the tokens!!!!

            newUser.save (err) ->
              if err
                console.log 'err svaing new user', err
                return err
              done null, newUser
        )
  )