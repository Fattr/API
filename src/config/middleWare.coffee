module.exports =
  headers: (req, res, next)->
    res.set 'API-KEY', 'wassup'

    if req.method == 'OPTIONS'
      res.send 200
    else
      next()