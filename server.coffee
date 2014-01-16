express = require 'express'
mongoose = require 'mongoose'
passport = require 'passport'
auth = require './src/config/passport.coffee'

mongoose.connect 'mongodb://localhost/test'

auth passport
app = express()

app.set 'port', process.env.PORT || 3000
app.use express.favicon()
app.use express.logger('dev')

app.use express.cookieParser()
app.use express.bodyParser()
app.use express.methodOverride()
app.use express.session(secret: 'super_fit')
app.use passport.initialize()
app.use passport.session()



app.get '/', (req, res) ->
  res.json hello: 'world'

app.get '/facebook', passport.authenticate 'facebook', (req, res) ->
  res.send req.user

app.get '/auth/facebook/callback', passport.authenticate 'facebook',
successRedirect: 'https://www.google.com'
failureRedirect: 'https://www.yahoo.com'


# use app.get to get port rather than hardcoded value.
app.listen(app.get 'port')
# string interpolation is dope.
console.log "I hears ya on #{app.get 'port'} breh!"