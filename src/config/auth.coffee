  # auth config here our app credits
'use strict'

moves: 'W6ST7Bbm4zAgovgWE2lhvJ2hA2mkBW6EFl6_f_8aMkPR0AVBGlQ6Q_rqT0klZGGC'

module.exports =
  facebook:
    clientID: '292173437605995'
    clientSecret: 'd471dc58c7c519ded6d72aef4321495c'
    callbackUrl: 'http://127.0.0.1:3000/auth/facebook/callback'

  moves:
    clientID: '06WHH0zJHzWcA0VNgZO05PC8np2Rs29w'
    clientSecret: moves
    callbackUrl: 'http://127.0.0.1:3000/auth/moves/callback'

  jawbone:
    clientID: 'L7nvgZdxe6Q'
    clientSecret: '8056dcae508c630f1c8a39bf5c9a0d0ec2493c1d'
    callbackUrl: 'http://127.0.0.1:3000/auth/jawbone/callback'

  runkeeper:
    clientID: 'c559bfec291944cba10490df6106e862'
    clientSecret: 'ff4ac3eb6e504a8093ab30afc5fadfe7'
    # authorizationURL: 'https://runkeeper.com/apps/authorize'

  # NIKE API doesn't let you register an app, but we can set it up that
  # users can auth their accounts, and make requests to GET
  # https://api.nike.com/me/sport/activities/{ID}?access_token={access_token}
  # to pull data. Each user will need to authenticate with their own personal
  # access token. I'll look into this some more