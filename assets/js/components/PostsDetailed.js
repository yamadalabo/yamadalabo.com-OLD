import React from 'react';
import moment from 'moment';

const PostsDetailed = ({ entities }) =>
  <div className="posts--detailed">
    {
      entities.map(entity => {
        return (
          <section className="post--detailed">
            <div className="post--detailed__header">
              <h1 className="upcase">
                <div className="date">
                  {moment.unix(entity.timestamp).format('MMMM YYYY')}
                </div>
                {entity.title}
              </h1>
            </div>
            <div
              className="post--detailed__body"
              dangerouslySetInnerHTML={{ __html: entity.body }}
            />
          </section>
        );
      })
    }
  </div>;

export default PostsDetailed;
