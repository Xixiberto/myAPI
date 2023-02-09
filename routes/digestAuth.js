var express = require('express');
var router = express.Router();
var auth = require('http-auth');
const utils = require("http-auth/src/auth/utils");
const authConnect = require("http-auth-connect");
var user;

var digest = auth.digest(
  {
    //realm: "testDigestRealm",
    algorithm: "MD5"
  },
  (username, callback) => {
    // Expecting md5(username:realm:password) in callback.
    
    console.log("username: "+username);
    if (username === "testDigest") {
      console.log("entra al if");
      callback(utils.md5("testDigest:users:testDigestPassword"));
    }  else {
      console.log("entra al else");
      callback();
    }
  }
);

digest.on('success', (result, req) => {
  console.log(`User authenticated: ${result.user}`);
  user = result.user;
});

digest.on('fail', (result, req) => {
  console.log(`User authentication failed: ${result.user}`);
  
  console.log(req.headers.authorization);
  //console.log("parse result: " + digest.parseAuthorization(req.headers.authorization));
});

digest.on('error', (error, req) => {
  console.log(`Authentication error: ${error.code + " - " + error.message}`);
});


/* GET users listing. */
router.use(authConnect(digest));
router.get('/', function(req, res, next) {
  res.send("ConAuthDigest");
});

router.get('/get', function(req, res, next) {
  res.send("GetConAuthDigest");
});

module.exports = router;