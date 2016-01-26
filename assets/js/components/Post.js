import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class Post extends Component {
  render() {
    return (
      <section className="post">
        <div className="post__header">
          <h1 className="upcase">
            <div className="date">
              {moment.unix(this.props.timestamp).format('MMMM YYYY')}
            </div>
            {this.props.title}
          </h1>
        </div>
        <div
          className="post__body"
          dangerouslySetInnerHTML={{ __html: this.props.body }}
        />
      </section>
    );
  }
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
};
