import { combineReducers } from 'redux';
import { START_FETCHING, SUCCEED_IN_FETCHING, FAIL_TO_FETCH } from '../actions/sync/news';

const entities = (state = [], action) => {
  const { type, payload } = action;
  if (type === SUCCEED_IN_FETCHING) {
    return payload.entities;
  }
  return state;
};

const isFetching = (state = false, action) => {
  const { type } = action;
  if (type === START_FETCHING) {
    return true;
  } else if (type === SUCCEED_IN_FETCHING || type === FAIL_TO_FETCH) {
    return false;
  }
  return state;
};

export const reducer = combineReducers({
  entities,
  isFetching,
});
