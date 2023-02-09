const express = require('express');
const api = express.Router();
const auth = require ('basic-auth');

/* VALIDATION FOR USER testBasic AND PASSWORD testBasic */

api.get('/', (req,res)=>{

    let user = auth(req)

  if (user === undefined || user['name'] !== 'testBasic' || user['pass'] !== 'testBasic') {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="Node"')
    res.end('Unauthorized')
  } else {
    res.send({message: 'Hello World! ' + 'Welcome! ' + user.name});
  }
});

api.get('/get', (req,res)=>{

  let user = auth(req)

if (user === undefined || user['name'] !== 'testBasic' || user['pass'] !== 'testBasic') {
  res.statusCode = 200
  res.setHeader('WWW-Authenticate', 'Basic realm="Node"')
  res.end('Unauthorized')
} else {
  res.send({message: 'Success get request ' + 'Welcome! ' + user.name});
}
});
module.exports = api;