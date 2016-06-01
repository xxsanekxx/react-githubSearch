import React from 'react';

function ErrorAlert({message}) {
  return (
    <div className="alert alert-danger" role="alert">{message}</div>
  );
}

export default ErrorAlert;
