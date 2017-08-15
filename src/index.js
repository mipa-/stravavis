import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import TokenExchange from './TokenExchange';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/token_exchange" component={TokenExchange} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
