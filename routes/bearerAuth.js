var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GENERATE TOKEN */
router.get('/generateToken',(req,res) =>{
  var user = {
    id: Date.now(),
    userEmail: req.query.userEmail,
    password: req.query.password
  }

  jwt.sign({user}, 'secretkey' ,(err, token) => {
    res.json({token})
  })
})

/* VALIDATE TOKEN */
router.get('/', verifytoken ,function(req, res, next) {

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err){
      res.sendStatus(403);
    }else {
      res.json({
        message: "Welcome to profile",
        userData: authData,
        end: 'Succesfull Bearer Auth'
      })
      
    }
  })
  
});

function verifytoken (req,res,next) {

  var bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    var bearer = bearerHeader.split(' ');
    var bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }else{
    req.sendStatus(403);
  }
}

module.exports = router;
