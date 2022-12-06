var express = require('express');
var router = express.Router();
var auth = require('http-auth');
const utils = require("http-auth/src/auth/utils");
const authConnect = require("http-auth-connect");

var digest = auth.digest(
  {
    realm: "testDigestRealm",
    algorithm: "MD5"
  },
  (username, callback) => {
    // Expecting md5(username:realm:password) in callback.
    if (username === "testDigest") {
      callback(utils.md5("testDigest:testDigestRealm:testDigestPassword"));
    }  else {
      callback();
    }
  }
);


/* GET users listing. */
router.use(authConnect(digest));
router.get('/', function(req, res, next) {
  res.send("ConAuthDigest");
});

module.exports = router;