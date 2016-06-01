/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// todo refactor li to icon component

function RepoInfo({ repo }) {
  return (
    <div className="col-md-6 repo-info">
      <h4>Repos Info</h4>
      <ul className="list-group">
        <li className="list-group-item"><span className="glyphicon glyphicon-random"></span> <b>{repo.forks_count || 0}</b> Forks</li>
        <li className="list-group-item"><span className="glyphicon glyphicon-star"></span> <b>{repo.stargazers_count || 0}</b> Stars</li>
        <li className="list-group-item"><span className="glyphicon glyphicon-alert"></span> <b>{repo.open_issues_count || 0}</b> Issues</li>
        <li className="list-group-item"><span className="glyphicon glyphicon-eye-open"></span> <b>{repo.watchers_count || 0}</b> Watchers</li>
        <li className="list-group-item"><span className="glyphicon glyphicon-user"></span> <b>{repo.subscribers_count || 0}</b> Subscribers</li>
        <li className="list-group-item"><span className="glyphicon glyphicon-floppy-disk"></span> <b>{repo.size || 0}</b> Size</li>
      </ul>
    </div>
  );
}

RepoInfo.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default RepoInfo;
