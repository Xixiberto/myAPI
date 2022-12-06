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


return app.oauth.token(request, response)
    .then(function(token) {
        
        res.json(token);
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

	res.send('Congratulations, you are in a secret area!');
});


module.exports = router;