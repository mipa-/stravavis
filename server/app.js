// server/app.js
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const stravaConfig = require('./config')
const strava = require('strava-v3');
const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// parse JSON parameters
app.use(bodyParser.json())

app.post('/api/handshake', (req, res) => {
  const code = req.body.code
  if (!code) {
    console.log('params', req.params)
    return res.status(400).send('Bad Request');
  }
  strava.oauth.getToken(code, function(data) {
    console.log('getToken', data)
    res.send({status: 'ok'})
    strava.athlete.get({},function(err, payload, limits) {
      if(!err) {
        console.log(payload);
      }
      else {
        console.log(err);
      }
    });
  })
})

app.get('/api/logout', (req, res) => {
  strava.oauth.deauthorize({}, (data) => {
    res.send({status: 'ok'})
  })
})

app.get('/api', (req,res) => {
  console.log('/api')

    strava.athletes.get({id:4516293},function(err,payload) {
      if(!err) {
        res.send(payload);
        console.log(payload);
      }
      else {
        console.log(err);
      }
	  })
})

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;