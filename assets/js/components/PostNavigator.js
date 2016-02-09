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
    return (
      <section className="paging">
        {this.renderPrevLink(this.props.prevPath)}
        {this.renderNextLink(this.props.nextPath)}
      </section>
    );
  }
}

PostNavigator.propTypes = {
  prevPath: PropTypes.string.isRequired,
  nextPath: PropTypes.string.isRequired,
};
