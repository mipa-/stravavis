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
        console.log(error.status)
        this.setState({data: null})
        if (error.status === 401) {
          this.setState({redirect: true})
        }
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
        console.log(error.status)
        if (error.status === 401) {
          this.setState({redirect: true})
        }
      });
  }

  listActivities(event) {
    event.preventDefault()
    const options = {
      url: '/api/listactivities',
      method: 'GET',
      type: 'json'
    };
    xhr(options)
      .then(function(data) {
        console.log(data)
        this.setState({data})
      }.bind(this))
      .catch(function(error) {
        console.log(error.status)
        this.setState({data: null})
        if (error.status === 401) {
          this.setState({redirect: true})
        }
      }.bind(this));
  }

  render() {
    return (
      <div>
        <h1>Stats</h1>
        <p>{this.state.data?JSON.stringify(this.state.data):''}</p>
        <p><a href="/athlete" onClick={this.listActivities.bind(this)}>List Activities</a></p>
        <p><a href="/logout" onClick={this.logout.bind(this)}>Log out</a></p>
        {this.state.redirect?<Redirect to="/"/>:null}
      </div>
    )
  }
}

export default Athlete