port = process.env.PORT or 3000

Session = require '../models/session'

module.exports =

  checkApiKey: (req, res, next) ->
    if req.headers["fittr-api-key"] isnt 'myKey' # wrong key
      res.send 401
    else
      next()

  checkSessionToken: (req, res, next) ->
    if not req.headers["fittr-session-token"] # no session token
      res.setHeader "location", "#{apiUrl}/login"
      res.send 401
    else
      token = req.headers["fittr-session-token"]
      Session.findOne('_access_token:': token, (err, session) ->
        if err
          console.log 'err finding session', err
          res.send 500
        else
          req._userid = session._userId
          next()
      )

  url: 'http://localhost:' + port