import React, { Component } from 'react';
import { Redirect } from 'react-router';
import xhr from 'tiny-xhr';
import './App.css';

class Athlete extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data: null,
      redirect: false
    }
  }

  componentWillMount() {
    const options = {
      url: '/api/athlete',
      method: 'GET',
      type: 'json'
    };
    xhr(options)
      .then(function(data) {
        console.log(data)
        this.setState({data})
      }.bind(this))
      .catch(function(error) {
        console.warn(error)
        this.setState({data: null})
      }.bind(this));
  }

  logout(event) {
    event.preventDefault()
    const options = {
      url: '/api/logout',
      method: 'GET',
      type: 'json'
    };
    xhr(options)
      .then(function(data) {
        console.log(data)
        this.setState({redirect: true})
      })
      .catch(function(error) {
        console.warn(error)
      });
  }

  render() {
    return (
      <div>
        <h1>Stats</h1>
        <p>{this.state.data?JSON.stringify(this.state.data):''}</p>
        <p><a href="/logout" onClick={this.logout.bind(this)}>Log out</a></p>
        {this.redirect?<Redirect to="/"/>:null}
      </div>
    )
  }
}

export default Athlete