import React from 'react';
import { PROFESSOR, GRADUATE } from '../constants/AuthorTypes';

const WorksNavigator = ({ handleShowByAuthor }) => {
  return (
    <div className="block">
      {
        [PROFESSOR, GRADUATE].map(author => {
          return (
            <a
              className="main"
              onClick={() => handleShowByAuthor(author)}
            >
              {author}
            </a>
          );
        })
      }
    </div>
  );
};

export default WorksNavigator;
