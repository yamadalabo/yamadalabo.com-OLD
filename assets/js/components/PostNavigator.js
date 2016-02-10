import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class PostNavigator extends Component {
  renderPrevLink(prevPath) {
    if (prevPath) {
      return (
        <div className="left">
          <Link to={prevPath}>
            ‹
          </Link>
        </div>
      );
    }
  }

  renderNextLink(nextPath) {
    if (nextPath) {
      return (
        <div className="right">
          <Link to={nextPath}>
            ›
          </Link>
        </div>
      );
    }
  }

  render() {
    const { prevPath, nextPath } = this.props;
    return (
      <section className="paging">
        {this.renderPrevLink(prevPath)}
        {this.renderNextLink(nextPath)}
      </section>
    );
  }
}

PostNavigator.propTypes = {
  prevPath: PropTypes.string,
  nextPath: PropTypes.string,
};
