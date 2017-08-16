import React, { Component } from 'react';
import xhr from 'tiny-xhr';

class Root extends Component {
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
      })
      .catch(function(error) {
        console.warn(error)
      });
  }

  logout() {
    const options = {
      url: '/api/logout',
      method: 'GET',
      type: 'json'
    };
    xhr(options)
      .then(function(data) {
        console.log(data)
      })
      .catch(function(error) {
        console.warn(error)
      });
  }

  render() {
    return (
      <div>
        <h1>Token Exchange</h1>
        
        <button onClick={this.logout}>Log out</button>
        
      </div>
    )
  }
}

export default Root;