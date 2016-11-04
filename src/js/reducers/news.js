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

const newsReducer = combineReducers({
  entities: newsEntities,
  updatedAt: newsUpdatedAt,
  isFetching: isFetchingNews,
});

export default newsReducer;
