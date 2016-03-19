import { put, call } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import moment from 'moment';
import { NEWS_LOAD, NEWS_REQUEST, NEWS_SUCCESS, NEWS_FAILURE,
         SEMINAR_LOAD, SEMINAR_REQUEST, SEMINAR_SUCCESS, SEMINAR_FAILURE,
         WORKS_LOAD, WORKS_REQUEST, WORKS_SUCCESS, WORKS_FAILURE } from '../actions';
import { callApi } from '../services';

/* eslint-disable no-constant-condition */

export const createUrl = (baseHostname, params) => {
  const url = `http://api.tumblr.com/v2/blog/${baseHostname}/posts?api_key=V7bVvLuqzan8hxMH00AuPcB5sgW3yMTHIIamkpRUy8HUqfJeVO`;
  if (params) {
    const query = Object.keys(params).reduce((prevQuery, key) =>
      `${prevQuery}&${key}=${params[key]}`
    , '');
    return url + query;
  }

  return url;
};

export function convertForNewsAndSeminar(result, offset) {
  const { posts, total_posts: totalPosts } = result;
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

export function convertForWorks(result) {
  const { posts } = result;
  const entities = posts.map(post => {
    const { id, title, body, tags: [workType, tagDate] } = post;
    let { timestamp } = post;
    if (tagDate) {
      const [year, month = 1] = tagDate.replace(/^date-/, '').split(/-/);
      timestamp = moment({ year, month: month - 1 }).unix();
    }

    return { id, title, body, workType, timestamp };
  });

  return {
    entities,
    updatedAt: moment().unix(),
  };
}

export const NEWS_HOSTNAME = 'yamadalab-ocu.tumblr.com';

export function* loadNews(getState) {
  yield put({ type: NEWS_REQUEST });
  const { offset } = getState().news;
  const params = { limit: 10, offset };
  const { result, error } = yield call(callApi, createUrl(NEWS_HOSTNAME, params));

  if (result) {
    const payload = convertForNewsAndSeminar(result, offset);
    yield put({ type: NEWS_SUCCESS, payload });
  } else {
    yield put({ type: NEWS_FAILURE, error });
  }
}

function* watchLoadNews(getState) {
  yield* takeEvery(NEWS_LOAD, loadNews, getState);
}

export const WORKS_HOSTNAME = 'yamadalab-works.tumblr.com';

export function* loadWorks() {
  yield put({ type: WORKS_REQUEST });
  const { result, error } = yield call(callApi, createUrl(WORKS_HOSTNAME));

  if (result) {
    const payload = convertForWorks(result);
    yield put({ type: WORKS_SUCCESS, payload });
  } else {
    yield put({ type: WORKS_FAILURE, error });
  }
}

function* watchLoadWorks() {
  yield* takeEvery(WORKS_LOAD, loadWorks);
}

export const SEMINAR_HOSTNAME = 'yamadalab-seminar.tumblr.com';

export function* loadSeminar(getState) {
  yield put({ type: SEMINAR_REQUEST });
  const { offset } = getState().seminar;
  const params = { limit: 10, offset };
  const { result, error } = yield call(callApi, createUrl(SEMINAR_HOSTNAME, params));

  if (result) {
    const payload = convertForNewsAndSeminar(result, offset);
    yield put({ type: SEMINAR_SUCCESS, payload });
  } else {
    yield put({ type: SEMINAR_FAILURE, error });
  }
}

function* watchLoadSeminar(getState) {
  yield* takeEvery(SEMINAR_LOAD, loadSeminar, getState);
}

export default function* root(getState) {
  yield [
    call(watchLoadNews, getState),
    call(watchLoadWorks),
    call(watchLoadSeminar, getState),
  ];
}
