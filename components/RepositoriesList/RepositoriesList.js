/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react';
import './RepositoriesList.scss';
import RepositoriesListItem from '../RepositoriesListItem';

function RepositoriesList({repositories}) {
  const repositoriesItems = repositories.map(repos => {
    return <RepositoriesListItem key={repos.id} repos={repos} />;
  });

  return (
    <table className="table table-striped table-bordered table-hover table-condensed">
      <thead>
        <tr>
          <th>#</th>
          <th>Url</th>
          <th>Owner</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {repositoriesItems}
      </tbody>
    </table>
  );
}

RepositoriesList.propTypes = {
  repositories: PropTypes.array.isRequired
};

export default RepositoriesList;
