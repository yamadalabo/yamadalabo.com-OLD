import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const PostNavigator = ({ prevPath, nextPath }) => {
  const renderPrevLink = path =>
    <div className="left">
      <Link to={path}>
        ‹
      </Link>
    </div>;

  const renderNextLink = path =>
    <div className="right">
      <Link to={path}>
        ›
      </Link>
    </div>;

  return (
    <section className="paging">
      {prevPath ? renderPrevLink(prevPath) : null}
      {nextPath ? renderNextLink(nextPath) : null}
    </section>
  );
};

PostNavigator.propTypes = {
  prevPath: PropTypes.string,
  nextPath: PropTypes.string,
};

export default PostNavigator;
