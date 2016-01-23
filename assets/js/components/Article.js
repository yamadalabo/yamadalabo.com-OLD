import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class Article extends Component {
  render() {
    return (
      <section className="post">
        <h1 className="upcase">
          <div className="date">
            {moment.unix(this.props.timestamp).format('MMMM YYYY')}
          </div>
          {this.props.title}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: this.props.body }} />
      </section>
    );
  }
}

Article.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
};
