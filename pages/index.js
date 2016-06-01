/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';
import { getLastRepositories, searchRepositories } from '../services/api';
import { browserHistory } from 'react-router';
import SearchForm from '../components/SearchForm';
import ItemsPerPage from '../components/ItemsPerPage';
import RepositoriesList from '../components/RepositoriesList';
import Pagination from '../components/Pagination';

export default class extends Component {
  state = {
    repositories: [],
    showFilters: false,
    sortBy: 'created',
    orderBy: 'desc',
  };

  handleButtonClickFiltersToggle = (e) => {
    e.preventDefault();
    this.setState({showFilters: !this.state.showFilters});
  };

  handleSearch = (params) => {
    // todo mb use extend or assign
    searchRepositories(params)
    .then(repositories => {
      this.setState({repositories: repositories.items, sortBy: params.sortBy, orderBy: params.orderBy});
    })
    .catch((err) => {
      browserHistory.push('/500');
    });
  };

  componentDidMount () {
    getLastRepositories()
      .then(repositories => {
        this.setState({repositories: repositories});
      })
      .catch((err) => {
        browserHistory.push('/500');
      });
  };

  render() {
    const searchButtonIconClass = 'glyphicon glyphicon-chevron-' + (this.state.showFilters ? 'up' : 'down');
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-2">
                <button className="btn btn-primary btn-circle searchForm" onClick={this.handleButtonClickFiltersToggle}>Search Form <span className={searchButtonIconClass} aria-hidden="true"/></button>
              </div>
            </div>
            <br/>
            <SearchForm show={this.state.showFilters}
                         handleSearch={this.handleSearch}
                         sortBy={this.state.sortBy}
                         orderBy={this.state.orderBy}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 pull-left">
            <ItemsPerPage />
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <RepositoriesList repositories={this.state.repositories} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 pull-right">
            <Pagination navClass="pull-right" />
          </div>
        </div>
      </div>
    );
  }
}
