const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const basicAuth = require('./routes/basicAuth');
const noAuth = require('./routes/noAuth');
const digestAuth = require('./routes/digestAuth');
const bearerAuth = require('./routes/bearerAuth');
const apikeyAuth = require('./routes/apikeyAuth');
const oauth2Auth = require('./routes/oauth2Auth');

app.use('/basicauth',basicAuth);
app.use('/noauth', noAuth);
app.use('/digestauth', digestAuth);
app.use('/bearerauth', bearerAuth);
app.use('/apikeyauth', apikeyAuth);
app.use('/oauth2Auth', oauth2Auth);

module.exports = app;
