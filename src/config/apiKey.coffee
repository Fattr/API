module.exports = (req, res, next) ->
  console.log req.headers
  console.log 'key', req.headers.apikey
  if req.headers.apikey != 'myKey'
    console.log 'wrong key'
    res.send 401
  else
    next()