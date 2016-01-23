import { CALL_API } from '../middleware/api';
import { NEWS, WORKS, SEMINAR } from '../constants/PageTypes';
import { PROFESSOR, GRADUATE } from '../constants/AuthorTypes';

const createUrl = (baseHostname, params) => {
  const url = `http://api.tumblr.com/v2/blog/${baseHostname}/posts?api_key=V7bVvLuqzan8hxMH00AuPcB5sgW3yMTHIIamkpRUy8HUqfJeVO`;

  if (params) {
    const query = Object.keys(params).reduce((prevQuery, key) => {
      return prevQuery + `&${key}=${params[key]}`;
    }, '');
    return url + query;
  }

  return url;
};

const NEWS_HOSTNAME = 'yamadalab-ocu.tumblr.com';
export const NEWS_REQUEST = 'NEWS_REQUEST';
export const NEWS_SUCCESS = 'NEWS_SUCCESS';
export const NEWS_FAILURE = 'NEWS_FAILURE';
export const NEWS_RESET = 'NEWS_RESET';

function fetchNews(params) {
  return {
    [CALL_API]: {
      pageType: NEWS,
      actionTypes: [NEWS_REQUEST, NEWS_SUCCESS, NEWS_FAILURE],
      url: createUrl(NEWS_HOSTNAME, params),
    },
  };
}

export function loadNews() {
  return (dispatch, getState) => {
    const { offset } = getState().news;
    return dispatch(fetchNews({ limit: 10, offset }));
  };
}

export function resetNews() {
  return {
    type: NEWS_RESET,
  };
}

const WORKS_HOSTNAMES = {
  [PROFESSOR]: 'yamadalab-professor.tumblr.com',
  [GRADUATE]: 'yamadalab-graduate.tumblr.com',
};
export const WORKS_REQUEST = 'WORKS_REQUEST';
export const WORKS_SUCCESS = 'WORKS_SUCCESS';
export const WORKS_FAILURE = 'WORKS_FAILURE';

function fetchWorks(author) {
  return {
    [CALL_API]: {
      pageType: WORKS,
      actionTypes: [WORKS_REQUEST, WORKS_SUCCESS, WORKS_FAILURE],
      authorType: author,
      url: createUrl(WORKS_HOSTNAMES[author]),
    },
    authorType: author,
  };
}

export function loadWorks(author) {
  return dispatch => {
    return dispatch(fetchWorks(author));
  };
}

const SEMINAR_HOSTNAME = 'yamadalab-seminar.tumblr.com';
export const SEMINAR_REQUEST = 'SEMINAR_REQUEST';
export const SEMINAR_SUCCESS = 'SEMINAR_SUCCESS';
export const SEMINAR_FAILURE = 'SEMINAR_FAILURE';
export const SEMINAR_RESET = 'SEMINAR_RESET';

function fetchSeminar(params) {
  return {
    [CALL_API]: {
      pageType: SEMINAR,
      actionTypes: [SEMINAR_REQUEST, SEMINAR_SUCCESS, SEMINAR_FAILURE],
      url: createUrl(SEMINAR_HOSTNAME, params),
    },
  };
}

export function loadSeminar() {
  return (dispatch, getState) => {
    const { offset } = getState().seminar;
    return dispatch(fetchSeminar({ limit: 10, offset }));
  };
}

export function resetSeminar() {
  return {
    type: SEMINAR_RESET,
  };
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE,
  };
}
