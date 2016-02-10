import 'babel-polyfill';
import fetchJsonp from 'fetch-jsonp';
import moment from 'moment';
import has from 'lodash/object/has';
import { NEWS, WORKS, SEMINAR } from '../constants/PageTypes';

export const CALL_API = Symbol('Call API');

function callApi(url) {
  return fetchJsonp(url).then(res => res.json());
}

function convertResForNews(res, offset) {
  const { posts, total_posts: totalPosts } = res;
  const entities = posts.map(post => {
    const { id, title, body, timestamp } = post;
    return { id, title, body, timestamp };
  });
  const shouldReload = ((totalPosts - offset - 10) > 0);

  return {
    entities,
    offset: offset + posts.length,
    updatedAt: moment().unix(),
    shouldReload,
  };
}

function convertResForWorks({ posts }) {
  const entities = posts.map(post => {
    const { id, title, body, tags: [workType, tagDate] } = post;
    let { timestamp } = post;
    if (tagDate) {
      const [year, month = 1] = tagDate.replace(/^date-/, '').split(/-/);
      timestamp = moment({ year, month: month - 1 }).unix();
    }

    return { id, title, body, workType, timestamp };
  });
  const updatedAt = moment().unix();

  return {
    entities,
    updatedAt,
  };
}

function convertResForSeminar(res, offset) {
  const { posts, total_posts: totalPosts } = res;
  const entities = posts.map(post => {
    const { id, title, body, timestamp } = post;
    return { id, title, body, timestamp };
  });
  const shouldReload = ((totalPosts - offset - 10) > 0);

  return {
    entities,
    offset: offset + posts.length,
    updatedAt: moment().unix(),
    shouldReload,
  };
}

const convertFuncs = {
  [NEWS]: convertResForNews,
  [WORKS]: convertResForWorks,
  [SEMINAR]: convertResForSeminar,
};

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { pageType, actionTypes, url } = callAPI;
  if (typeof pageType !== 'string') {
    throw new Error('Expected pageType to be strings');
  }
  if (!Array.isArray(actionTypes) || actionTypes.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!actionTypes.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }
  if (typeof url !== 'string') {
    throw new Error('Expected url to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, data, action);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = actionTypes;
  next(actionWith({ type: requestType }));

  const currentState = store.getState();
  const offset = has(currentState[pageType], 'offset') ? currentState[pageType].offset : null;

  callApi(url).then(
    res => {
      const payload = convertFuncs[pageType](res.response, offset);
      next(actionWith({
        type: successType,
        payload,
      }));
    },
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happend.',
    }))
  );
};
