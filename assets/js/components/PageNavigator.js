import React from 'react';
import { Link } from 'react-router';
import { HOME_PATH, NEWS_PATH, WORKS_PATH,
         PROFILE_PATH, SEMINAR_PATH } from '../constants/PathTypes';

const PATH_TITLES = {
  [HOME_PATH]: 'Home',
  [NEWS_PATH]: 'News',
  [WORKS_PATH]: 'Works',
  [PROFILE_PATH]: 'Profile',
  [SEMINAR_PATH]: 'Seminar',
};

const PageNavigator = () =>
  <div className="block">
    {
      [HOME_PATH, PROFILE_PATH, NEWS_PATH, WORKS_PATH, SEMINAR_PATH].map(path =>
        <Link
          to={path}
          className="main"
          key={PATH_TITLES[path]}
        >
          {PATH_TITLES[path]}
        </Link>
      )
    }
  </div>;

export default PageNavigator;
