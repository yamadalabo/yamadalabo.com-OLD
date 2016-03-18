import { put, take, call } from 'redux-saga/effects';
import moment from 'moment';
import { NEWS_REQUEST, NEWS_SUCCESS, NEWS_FAILURE,
         SEMINAR_REQUEST, SEMINAR_SUCCESS, SEMINAR_FAILURE,
         WORKS_REQUEST, WORKS_SUCCESS, WORKS_FAILURE } from '../actions';
import { callApi } from '../services';

/* eslint-disable no-constant-condition */

const createUrl = (baseHostname, params) => {
  const url = `http://api.tumblr.com/v2/blog/${baseHostname}/posts?api_key=V7bVvLuqzan8hxMH00AuPcB5sgW3yMTHIIamkpRUy8HUqfJeVO`;
  if (params) {
    const query = Object.keys(params).reduce((prevQuery, key) =>
      `${prevQuery}&${key}=${params[key]}`
    , '');
    return url + query;
  }

  return url;
};

const NEWS_HOSTNAME = 'yamadalab-ocu.tumblr.com';

function convertForNewsAndSeminar(result, offset) {
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

function* fetchNews(getState) {
  while (true) {
    yield take(NEWS_REQUEST);
    const { offset } = getState().news;
    const params = { limit: 10, offset };
    const { result, error } = yield call(callApi, createUrl(NEWS_HOSTNAME, params));
    const payload = convertForNewsAndSeminar(result, offset);

    if (error) {
      yield put({ type: NEWS_FAILURE, error });
    } else {
      yield put({ type: NEWS_SUCCESS, payload });
    }
  }
}

const WORKS_HOSTNAME = 'yamadalab-works.tumblr.com';

function convertForWorks(result) {
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

function* fetchWorks() {
  while (true) {
    yield take(WORKS_REQUEST);
    const { result, error } = yield call(callApi, createUrl(WORKS_HOSTNAME));
    const payload = convertForWorks(result);

    if (error) {
      yield put({ type: WORKS_FAILURE, error });
    } else {
      yield put({ type: WORKS_SUCCESS, payload });
    }
  }
}

const SEMINAR_HOSTNAME = 'yamadalab-seminar.tumblr.com';

function* fetchSeminar(getState) {
  while (true) {
    yield take(SEMINAR_REQUEST);
    const { offset } = getState().seminar;
    const params = { limit: 10, offset };
    const { result, error } = yield call(callApi, createUrl(SEMINAR_HOSTNAME, params));
    const payload = convertForNewsAndSeminar(result, offset);

    if (error) {
      yield put({ type: SEMINAR_FAILURE, error });
    } else {
      yield put({ type: SEMINAR_SUCCESS, payload });
    }
  }
}

export default function* root(getState) {
  yield [
    call(fetchNews, getState),
    call(fetchSeminar, getState),
    call(fetchWorks),
  ];
}
