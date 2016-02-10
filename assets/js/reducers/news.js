import { combineReducers } from 'redux';
import { NEWS_REQUEST, NEWS_SUCCESS, NEWS_FAILURE, NEWS_RESET } from '../actions';

function newsEntities(state = [], action) {
  const { type, payload } = action;
  if (type === NEWS_SUCCESS) {
    return [...state, ...payload.entities];
  } else if (type === NEWS_RESET) {
    return [];
  }
  return state;
}

function newsOffset(state = 0, action) {
  const { type, payload } = action;
  if (type === NEWS_SUCCESS) {
    return payload.offset;
  } else if (type === NEWS_RESET) {
    return 0;
  }
  return state;
}

function newsUpdatedAt(state = null, action) {
  const { type, payload } = action;
  if (type === NEWS_SUCCESS) {
    return payload.updatedAt;
  }
  return state;
}

function isFetchingNews(state = false, action) {
  const { type } = action;
  if (type === NEWS_REQUEST) {
    return true;
  } else if (type === NEWS_SUCCESS || type === NEWS_FAILURE) {
    return false;
  }
  return state;
}

function shouldReloadNews(state = false, action) {
  const { type, payload } = action;
  if (type === NEWS_SUCCESS) {
    return payload.shouldReload;
  }
  return state;
}

const newsReducer = combineReducers({
  entities: newsEntities,
  offset: newsOffset,
  updatedAt: newsUpdatedAt,
  isFetching: isFetchingNews,
  shouldReload: shouldReloadNews,
});

export default newsReducer;
