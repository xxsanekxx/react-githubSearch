import React, { PropTypes } from 'react';
import './RepositoriesListItem.scss';
import { Link } from 'react-router';

function RepositoriesListItem({repos}) {

  return (
    <tr>
      <td>{repos.id}</td>
      <td><Link to={"/repo/" + repos.owner.login + '/' + repos.name}>{repos.name}</Link></td>
      <td>{repos.owner.login}</td>
      <td>{repos.name}</td>
    </tr>
  );
}

RepositoriesListItem.propTypes = {
  repos: PropTypes.object.isRequired
};

export default RepositoriesListItem;

