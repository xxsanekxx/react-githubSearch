/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';
import { getRepo } from '../services/api';
import { browserHistory } from 'react-router';

export default class extends Component {

  state = {
    repo: {}
  };

  componentDidMount () {
    const params = {
      owner: this.props.params.owner,
      name: this.props.params.name
    };
    getRepo(params)
      .then(repo => {
        console.log(repo);
        this.setState({repo: repo});
      })
      .catch((err) => {
        browserHistory.push('/500');
      });
  }

  render() {
    return (
      <div>
        <h1>{this.props.params.owner}</h1>
        <p>{this.props.params.name}</p>
      </div>
    );
  }

}
