# requiring dependencies

express = require 'express'
mongoose = require 'mongoose'
cors = require './config/middleWare'
mongoConfig = require './config/dbconfig'

# connect to DB
mongoose.connect mongoConfig.url
app = express()

# app config
# express middleware for passport and sessions
app.set 'port', process.env.PORT || 3000
app.use express.logger('dev')

app.use cors.headers
app.use express.bodyParser()
app.use express.methodOverride()

# routes for api and DB endpoints
require('./config/routes')(app)

# use app.get to get port rather than hardcoded value.
app.listen app.get 'port'

console.log "I hears ya on #{app.get 'port'} breh!"