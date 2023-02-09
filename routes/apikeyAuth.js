var express = require('express');
var router = express.Router();
var data = require('../data/apikeydata.json');
var fs = require('fs');
const generateApiKey = require('generate-api-key');


/* GENERATE API KEY */
var key = generateApiKey.generateApiKey();

router.get('/generateAPIKey', function(req, res, next) {
    if(req.query.email !== undefined){
        filepath = './data/apikeydata.json';
        data = {email: req.query.email, key: key}
        var jsonString = JSON.stringify(data);
        fs.writeFile(filepath,jsonString, function() {
            res.send('Succesfull APIKey Generation: ' + key);
        })
        
    }else {
        res.end('Please send email in request');
    }
  
});

/* VALIDATE API KEY */
router.get('/', function(req, res, next) {
    
    if(data.key === req.query.id || data.key === req.headers.id){
        //console.log("entra al if: "+req.query.id);
        res.send("Valid API Key");
    }else{
        res.send("Invalid Token");
    }
    
   
});

router.get('/get', function(req, res, next) {
    
    
    if(data.key === req.query.id || data.key === req.headers.id){
       
        res.json({message: "VALID GET API KEY"});
    }else{
        res.send("Invalid Token");
    }
   
});

module.exports = router;