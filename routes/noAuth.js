var express = require('express');
var router = express.Router();

/* NO VALIDATION NEEDED */
router.get('/', function(req, res, next) {
  res.send('sucess no auth');
});

module.exports = router;