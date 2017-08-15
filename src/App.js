import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to StravaVis</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          <a href="https://www.strava.com/oauth/authorize?client_id=16870&response_type=code&redirect_uri=http://localhost:3000/token_exchange&approval_prompt=auto">
            Log in using Strava
          </a>
        </p>
      </div>
    );
  }
}

export default App;

