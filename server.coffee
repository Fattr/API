express = require('express')

app = express()
app.set 'port', 3000
app.get '/', (req, res) ->
  res.json hello: 'world'

app.listen(3000)