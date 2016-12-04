import React, { PropTypes } from 'react';
import moment from 'moment';

const Post = ({ title, body, timestamp }) =>
  <section className="post">
    <div className="post__header">
      <h1>
        <div className="date upcase">
          {moment.unix(timestamp).format('MMMM YYYY')}
        </div>
        {title}
      </h1>
    </div>
    <div
      className="post__body"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  </section>;

Post.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default Post;
