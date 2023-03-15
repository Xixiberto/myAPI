var express = require('express');
var router = express.Router();

/* NO VALIDATION NEEDED */
router.get('/', function(req, res, next) {
  res.send('sucess no auth');
});

/* NO VALIDATION NEEDED */
router.get('/get', function(req, res, next) {
  
  
  //res.sendStatus(200);
  res.setHeader('Content-Type', 'application/json');
  
  //res.end(JSON.stringify({response: 'sucess get request'}));
  res.status(201).send(JSON.stringify({response: 'sucess get request'}));
  
});

router.get('/getTimeout', function(req, res, next) {
  
  
  //res.sendStatus(200);
  setTimeout((() => {
    res.setHeader('Content-Type', 'application/json');
  
  //res.end(JSON.stringify({response: 'sucess get request'}));
  
    return res.status(201).send(JSON.stringify({response: 'sucess get request timeout'}));
  }), 10000)
  
  
});

module.exports = router;