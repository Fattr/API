port = process.env.PORT || 3000

module.exports =

  checkApiKey: (req, res, next) ->
    if req.headers.apikey isnt 'myKey'
      # wrong key
      res.send 401
    else
      next()

  url: 'http://localhost:' + port