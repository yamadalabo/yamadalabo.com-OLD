import React from 'react';
import { Link } from 'react-router';

const PostNavigator = ({ prevPath, nextPath }) => {
  if (prevPath && nextPath) {
    return (
      <section className="paging">
        <div className="left">
          <Link to={prevPath}>
            ‹
          </Link>
        </div>
        <div className="right">
          <Link to={nextPath}>
            ›
          </Link>
        </div>
      </section>
    );
  } else if (!prevPath && nextPath) {
    return (
      <section className="paging">
        <div className="right">
          <Link to={nextPath}>
            ›
          </Link>
        </div>
      </section>
    );
  } else if (prevPath && !nextPath) {
    return (
      <section className="paging">
        <div className="left">
          <Link to={prevPath}>
            ‹
          </Link>
        </div>
      </section>
    );
  }
};

export default PostNavigator;
