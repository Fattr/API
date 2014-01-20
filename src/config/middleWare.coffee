module.exports =
  headers: (req, res, next)->
    res.header 'Access-Control-Allow-Origin', '*'
    res.header 'Access-Control-Allow-Methods',
                'GET, POST, PUT, DELETE, OPTIONS'
    res.header 'Access-Control-Allow-Headers',
                'Content-Type, Apikey, Authorization, Content-Length,
                X-Requested-With'

                # no === in coffeeScript
                # this is for CORS preflight checks
    if req.methods == 'OPTIONS' then res.send 200 else next()