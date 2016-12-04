import React from 'react';
import { Link } from 'react-router';
import { HOME, NEWS, WORKS,
         PROFILE, SEMINAR } from '../constants/Pages';

const PAGE_PROPS = {
  [HOME]: {
    title: 'Home',
    path: '/',
  },
  [PROFILE]: {
    title: 'Profile',
    path: '/profile',
  },
  [NEWS]: {
    title: 'News',
    path: '/news',
  },
  [WORKS]: {
    title: 'Works',
    path: '/works',
  },
  [SEMINAR]: {
    title: 'Seminar',
    path: '/seminar',
  },
};

const PageNavigator = () =>
  <div className="block">
    {
      [HOME, PROFILE, NEWS, WORKS, SEMINAR].map(page =>
        <Link
          to={PAGE_PROPS[page].path}
          className="main"
          key={PAGE_PROPS[page].title}
        >
          {PAGE_PROPS[page].title}
        </Link>,
      )
    }
  </div>;

export default PageNavigator;
