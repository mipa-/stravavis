import React, { Component } from 'react';
import { Redirect } from 'react-router';
import xhr from 'tiny-xhr';
import './App.css';

class Root extends Component {
  constructor(props) {
    super(props)
    this.state = {ready: false}
  }

  componentWillMount() {
    let code
    const href = window.location.href
    const index = href.indexOf('&code=')
    if (index === -1) {
      return
    }
    if (href.indexOf('&', index + 6) === - 1) {
      code = href.substring(index + 6)
    } else {
      code = href.substring(index + 6, href.indexOf('&', index + 6))
    }
    if (!code) {
      console.log(href, index, href.substring(index) + 6)
      return
    }

    const options = {
      url: '/api/handshake',
      method: 'POST',
      type: 'json',
      data: JSON.stringify({code})
    };
    xhr(options)
      .then(function(data) {
        console.log(data)
        this.setState({ready: true})
      }.bind(this))
      .catch(function(error) {
        console.warn(error)
      }.bind(this));
  }

  render() {
    return (
      <div>
        <h1>Token Exchange</h1>
        
        {this.state.ready?<Redirect to="/athlete" />:null}
        
      </div>
    )
  }
}

export default Root;