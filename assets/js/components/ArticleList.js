import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default class ArticleList extends Component {
  render() {
    return (
      <ul className="posts">
        {
          this.props.entities.map(entity => {
            return (
              <li>
                <small className="datetime muted">
                  {moment.unix(entity.timestamp).fromNow()}
                </small>
                <Link to={`${this.props.pageType}/${entity.id}`}>
                  {entity.title}
                </Link>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

ArticleList.propTypes = {
  pageType: PropTypes.string.isRequired,
  entities: PropTypes.array.isRequired,
};
