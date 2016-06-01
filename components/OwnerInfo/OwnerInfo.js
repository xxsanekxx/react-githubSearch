/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
const DEFAULT_AVATAR_IMG = '';

function OwnerInfo({ owner }) {
  return (
    <div className="col-md-6 owner-info">
      <h4>Owner Info</h4>
      <p><img src={owner.avatar_url || DEFAULT_AVATAR_IMG} alt="user avatar" /></p>
      <p>{owner.login}</p>
    </div>
  );
}

OwnerInfo.propTypes = {
  owner: PropTypes.object.isRequired,
};

export default OwnerInfo;
