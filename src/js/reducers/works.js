import { combineReducers } from 'redux';
import { WORKS_REQUEST, WORKS_SUCCESS, WORKS_FAILURE, WORKS_CHANGE_FILTER } from '../actions';
import { SHOW_ALL } from '../constants/WorksFilters';

function worksEntities(state = [], action) {
  const { type, payload } = action;
  if (type === WORKS_SUCCESS) {
    return [...state, ...payload.entities];
  }
  return state;
}

function worksUpdatedAt(state = null, action) {
  const { type, payload } = action;
  if (type === WORKS_SUCCESS) {
    return payload.updatedAt;
  }
  return state;
}

function isFetchingWorks(state = false, action) {
  const { type } = action;
  if (type === WORKS_REQUEST) {
    return true;
  } else if (type === WORKS_SUCCESS || type === WORKS_FAILURE) {
    return false;
  }
  return state;
}

function worksFilter(state = SHOW_ALL, action) {
  const { type, payload } = action;
  if (type === WORKS_CHANGE_FILTER) {
    return payload.filter;
  }
  return state;
}

const worksReducer = combineReducers({
  entities: worksEntities,
  updatedAt: worksUpdatedAt,
  isFetching: isFetchingWorks,
  filter: worksFilter,
});

export default worksReducer;
