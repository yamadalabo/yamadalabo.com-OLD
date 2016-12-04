import { combineReducers } from 'redux';
import {
  START_FETCHING,
  SUCCEED_IN_FETCHING,
  FAIL_TO_FETCH,
  RESET_ERROR,
  CHANGE_FILTER,
} from '../actions/sync/works';
import { SHOW_ALL } from '../constants/WorksFilters';

const entities = (state = [], action) => {
  const { type, payload } = action;
  if (type === SUCCEED_IN_FETCHING) {
    const sortedEntities = payload.entities.sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return -1;
      } else if (a.timestamp < b.timestamp) {
        return 1;
      }
      return 0;
    });
    return sortedEntities;
  }
  return state;
};

const error = (state = null, action) => {
  const { type, error: errorMessage } = action;
  if (type === FAIL_TO_FETCH) {
    return errorMessage;
  } else if (type === RESET_ERROR) {
    return null;
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

const filter = (state = SHOW_ALL, action) => {
  const { type, payload } = action;
  if (type === CHANGE_FILTER) {
    return payload.filter;
  }
  return state;
};

export default combineReducers({
  entities,
  error,
  filter,
  isFetching,
});
