frisby = require 'frisby'

URL = 'http://localhost:3000'


frisby.create('GET hello world').get(URL).expectStatus(200).expectJSONTypes(
  test: String
).expectJSON(
  test: 'hello world'
).toss()

frisby.create('GET /test').get("#{URL}/test").expectStatus(500).toss()

frisby.create('POST new user without apikey').post("#{URL}/signup",
  username: 'test'
  password: 'test'
  ).expectStatus(500).toss()

# passes apikey in headers for following tests
frisby.globalSetup request:
  headers:
    apikey: "myKey"

frisby.create('POST /signup with apikey').post("#{URL}/signup",
  username: 'test'
  password: 'test'
  ).expectStatus(201).expectHeaderContains("Content-Type", "text/plain").toss()
