import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

const WORK_PROPS = {
  paper: {
    title: 'PAPER',
    color: 'colour-1',
  },
  book: {
    title: 'BOOK',
    color: 'colour-2',
  },
  graduatework: {
    title: 'WORK BY GRADUATE',
    color: 'colour-3',
  },
  others: {
    title: 'OTHERS',
    color: 'colour-4',
  },
};

const Posts = ({ pagePath, entities }) => {
  const renderMetaData = (entity) => {
    if (pagePath.match(/^\/works.*/)) {
      return (
        <small className="datetime muted">
          {moment.unix(entity.timestamp).format('MMMM YYYY')}
          {' / '}
          <i className={`icon-${entity.workType} ${WORK_PROPS[entity.workType].color}`} />
          {WORK_PROPS[entity.workType].title}
        </small>
      );
    }
    return (
      <small className="datetime muted">
        {moment.unix(entity.timestamp).format('MMMM YYYY')}
      </small>
    );
  };

  return (
    <ul className="posts">
      {
        entities.map(entity =>
          <li key={entity.id}>
            {renderMetaData(entity)}
            <Link to={`${pagePath}/${entity.id}`}>
              {entity.title}
            </Link>
          </li>,
        )
      }
    </ul>
  );
};

Posts.propTypes = {
  pagePath: PropTypes.string.isRequired,
  entities: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    workType: PropTypes.string,
  })).isRequired,
};

export default Posts;
