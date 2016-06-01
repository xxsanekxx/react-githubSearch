/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component, PropTypes } from 'react';
import { getRepo } from '../services/api';
import { browserHistory } from 'react-router';
import RepoInfo from '../components/RepoInfo';
import OwnerInfo from '../components/OwnerInfo';

export default class extends Component {

  state = {
    repo: {
      owner: {}
    }
  };

  static propTypes = {
    params: PropTypes.object.isRequired,
  };

  componentDidMount () {
    getRepo(this.props.params)
      .then(repo => {
        this.setState({repo: repo});
      })
      .catch((err) => {
        browserHistory.push('/500');
      });
  }

  render() {
    const created = this.state.repo.created_at ? new Date(this.state.repo.created_at).toString() : 'no data';
    const updated = this.state.repo.updated_at ? new Date(this.state.repo.updated_at).toString() : 'no data';
    const pushed = this.state.repo.pushed_at ? new Date(this.state.repo.pushed_at).toString() : 'no data';
    return (
      <div className="panel panel-default repo-container">
        <div className="panel-heading">
          <h3 className="panel-title">{this.state.repo.name || ''}</h3>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-12">
              <p>{this.state.repo.description || ''}</p>
            </div>
          </div>
          <div className="row">
            <RepoInfo repo={this.state.repo} />
            <OwnerInfo owner={this.state.repo.owner} />
          </div>
          <div className="row">
            <div className="col-md-4"><p>created: <b>{created}</b></p></div>
            <div className="col-md-4"><p>updated: <b>{updated}</b></p></div>
            <div className="col-md-4"><p>pushed: <b>{pushed}</b></p></div>
          </div>
        </div>
      </div>
    );
  }

}
