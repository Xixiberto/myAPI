var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var OAuth2Server = require('oauth2-server');
var Request = OAuth2Server.Request;
var Response = OAuth2Server.Response;

/* MONGODB CREATION AND CONNECTION */

var uristring = 'mongodb://localhost/oauth2test';

mongoose.connect(uristring, function (err, res) {
    if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + uristring);
    }
  });

app.oauth = new OAuth2Server({
  debug: true,
  model: require('../db/model'),
  accessTokenLifetime: 60 * 60,
  allowBearerTokensInQueryString: true
});

/*CREATE AND VALIDATE TOKEN FUNCTIONS */
function obtainToken(req, res) {


var request = new Request(req);
var response = new Response(res);


console.log(request.headers);
console.log(request.body);
//console.log("*******************************")
//console.log(response.query);
//console.log(response.headers);
//console.log(response.body);

//console.log("response: " + response);

return app.oauth.token(request, response)
    .then(function(token) {
        var newToken = token;
        newToken.access_token = token.accessToken;
        newToken.refresh_token = token.refreshToken;
        newToken.token_type = 'Bearer';
        newToken.accessToken = undefined;
        newToken.refreshToken = undefined;
        
        res.status(200).json(newToken);
    }).catch(function(err) {

        res.status(err.code || 500).json(err);
    });
}

function authenticateRequest(req, res, next) {

var request = new Request(req);
var response = new Response(res);

return app.oauth.authenticate(request, response)
    .then(function(token) {

        next();
    }).catch(function(err) {

        res.status(err.code || 500).json(err);
    });
}
  

/* ENDPOINTS */

router.all('/getToken', obtainToken);

router.get('/', authenticateRequest, function(req, res) {

	res.json({message: "Congratulations, you are in a secret area!"});
});

router.get('/get', authenticateRequest, function(req, res) {
  console.log(req.query);
  console.log(req.headers);
  console.log(req.body);
	res.json({message: "GOOD GET REQUEST OAUTH2"});
});


module.exports = router;