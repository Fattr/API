(function() {
  var URL, frisby;

  frisby = require('frisby');

  URL = 'http://localhost:3000';

  frisby.globalSetup({
    request: {
      headers: {
        apikey: "myKey"
      }
    }
  });

  frisby.create('Create new user').post("" + URL + "/users", {
    email: 'test@test.com',
    password: 'test'
  }).expectStatus(201).expectJSONTypes({
    createdAt: String,
    _id: String
  }).toss();

}).call(this);

/*
//# sourceMappingURL=../../target/config/routeHelpers_spec.js.map
*/