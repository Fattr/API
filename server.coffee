express = require('express')

app = express()
app.set 'port', 3000
app.get '/', (req, res) ->
  res.json hello: 'world'

# use app.get to get port rather than hardcoded value.
app.listen(app.get 'port')
# string interpolation is dope.
console.log "I hears ya on #{app.get 'port'} breh!"