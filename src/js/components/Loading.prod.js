import React from 'react';

/* global LoadingImage */

const Loading = () =>
  <section className="post">
    <img
      alt="loading"
      className="loading"
      src={LoadingImage}
    />
  </section>;

export default Loading;
