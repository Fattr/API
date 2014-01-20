frisby = require 'frisby'

URL = 'http://localhost:3000'

frisby.globalSetup request:
  headers:
    apikey: "myKey"


incrementEmail = () ->
  num = Math.floor(Math.random()*1000)
  "test#{num}@test.com"

frisby.create('Create new user').post("#{URL}/users",
{email: incrementEmail, password: 'test'})
.expectStatus(201).expectJSONTypes(
  createdAt: String
  _id: String
).toss()
