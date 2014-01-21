app = require './server.coffee'


app.listen app.get 'port'

console.log "I hears ya on #{app.get 'port'} breh!"