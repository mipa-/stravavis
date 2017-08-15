// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/api', (req,res) => {
  console.log('/api')
	var strava = require('strava-v3');

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