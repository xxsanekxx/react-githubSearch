/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react';
import './Pagination.scss';
import { Link } from 'react-router';

function Pagination({navClass}) {
  return (
    <nav className={navClass}>
      <ul className="pagination">
        <li className="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
        <li className="active"><a href="#">1 <span className="sr-only">(current)</span></a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  navClass: PropTypes.string.isRequired
};

export default Pagination;
