import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default class Posts extends Component {
  render() {
    const { pagePath, entities } = this.props;
    return (
      <ul className="posts">
        {
          entities.map(entity =>
            <li key={entity.id}>
              <small className="datetime muted">
                {moment.unix(entity.timestamp).fromNow()}
              </small>
              <Link to={`${pagePath}/${entity.id}`}>
                {entity.title}
              </Link>
            </li>
          )
        }
      </ul>
    );
  }
}

Posts.propTypes = {
  pagePath: PropTypes.string.isRequired,
  entities: PropTypes.array.isRequired,
};
