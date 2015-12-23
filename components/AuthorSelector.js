import React from 'react';
import { SHOW_PROFESSOR, SHOW_GRADUATE } from '../constants/AuthorFilters';

const AUTHOR_FILTER_TITLES = {
  [SHOW_PROFESSOR]: '教員',
  [SHOW_GRADUATE]: '院生',
};

export const AuthorSelector = ({ filter: selectedFilter, onShow }) => {
  return (
    <div className="ui right floated small buttons">
      {[SHOW_PROFESSOR, SHOW_GRADUATE].map((filter, index) => {
        return (
          <button
            className={`ui button ${filter === selectedFilter ? 'active' : 'not-active'}`}
            key={filter + index}
            onClick={() => onShow(filter)}
          >
            {AUTHOR_FILTER_TITLES[filter]}
          </button>
        );
      })}
    </div>
  );
};
