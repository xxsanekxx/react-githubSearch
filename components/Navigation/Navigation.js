/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React from 'react';
import './Navigation.scss';
import { Link } from 'react-router';

function Navigation() {
  return (
    <ul className="Navigation" role="menu">
      <li className="Navigation-item">
        <Link to="/" activeClassName="active" className="Navigation-link">Home</Link>
      </li>
      <li className="Navigation-item">
        <Link to="/about" activeClassName="active" className="Navigation-link">About</Link>
      </li>
    </ul>
  );
}

export default Navigation;
