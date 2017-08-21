// server/app.js
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
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
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET
}))

app.post('/api/handshake', (req, res) => {
  const code = req.body.code
  if (!code) {
    return res.status(400).send('Bad Request');
  }
  console.log('getToken '+code)
  strava.oauth.getToken(code, function(err, payload, limits) {
    console.log('getToken', payload)
    console.log('getToken', payload.access_token)
    if (typeof payload === 'undefined'
     || typeof payload.access_token === 'undefined') {
       return res.status(401).send({status: 'fail'})
     }
    req.session.access_token = payload.access_token
    res.send({status: 'ok'})
  })
})

app.get('/api/athlete', (req, res) => {
  const access_token = req.session.access_token
  if (!access_token) {
    return res.status(401).send({status: 'not logged in'})
  }

  strava.athlete.get({access_token},function(err, payload, limits) {
    if(!err) {
      console.log(payload);
      res.send(payload)
    }
    else {
      console.log(err);
      res.send(err)
    }
  });
})

app.get('/api/listactivities', (req, res) => {
  const access_token = req.session.access_token
  if (!access_token) {
    return res.status(401).send({status: 'not logged in'})
  }

  strava.athlete.listActivities({access_token},function(err, payload, limits) {
    if(!err) {
      console.log(payload);
      res.send(payload)
    }
    else {
      console.log(err)
      res.send(err)
    }
  });
})

app.get('/api/logout', (req, res) => {
  const access_token = req.session.access_token
  if (!access_token) {
    return res.status(401).send({status: 'not logged in'})
  }

  strava.oauth.deauthorize({access_token}, (err, data) => {
    if (err) {
      res.status(400).send({status: 'fail'})
    } else {
      res.send({status: 'ok'})
    }
  })
})

app.get('/api', (req,res) => {
  console.log('/api')
})

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;