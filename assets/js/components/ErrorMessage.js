import React from 'react';

const ErrorMessage = ({ message }) =>
  <section className="post">
    <div className="post__header">
      <h1>{message}</h1>
    </div>
  </section>;

export default ErrorMessage;
