# requiring dependencies

express = require 'express'
mongoose = require 'mongoose'
passport = require 'passport'


# pass passport to our passport auth file for config
auth = require('./config/passport')(passport)

mongoConfig = require './config/dbconfig'

# connect to DB
# mongoose.connect mongoConfig.url
app = express()

# app config
# express middleware for passport and sessions
app.set 'port', process.env.PORT || 3000
app.use express.favicon()
app.use express.logger('dev')

app.use express.cookieParser()
app.use express.bodyParser()
app.use express.methodOverride()
app.use express.session(secret: 'super_fit')
app.use passport.initialize()
app.use passport.session()


# routes for api and DB endpoints
require('./config/routes')(app, passport)

# use app.get to get port rather than hardcoded value.
app.listen app.get 'port'

console.log "I hears ya on #{app.get 'port'} breh!"