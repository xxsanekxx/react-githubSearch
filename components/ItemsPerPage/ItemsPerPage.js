/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function ItemsPerPage () {
  return (
    <select name="itemsPerPage" id="searchResult" className="form-control" defaultValue="100" disabled>
      <option value="10">10</option>
      <option value="30">30</option>
      <option value="50">50</option>
      <option value="80">80</option>
      <option value="100">100</option>
    </select>
  );
}

export default ItemsPerPage;
