import { combineReducers } from 'redux';
import { WORKS_REQUEST, WORKS_SUCCESS, WORKS_FAILURE } from '../actions';
import { GRADUATE } from '../constants/AuthorTypes';

function graduateEntities(state = [], action) {
  const { type, payload, authorType } = action;
  if (authorType === GRADUATE && type === WORKS_SUCCESS) {
    return [...state, ...payload.entities];
  }
  return state;
}

function graduateUpdatedAt(state = null, action) {
  const { type, payload, authorType } = action;
  if (authorType === GRADUATE && type === WORKS_SUCCESS) {
    return payload.updatedAt;
  }
  return state;
}

function isFetchingGraduate(state = false, action) {
  const { type, authorType } = action;
  if (authorType === GRADUATE && type === WORKS_REQUEST) {
    return true;
  } else if (authorType === GRADUATE && (type === WORKS_SUCCESS || type === WORKS_FAILURE)) {
    return false;
  }
  return state;
}

const graduateReducer = combineReducers({
  entities: graduateEntities,
  updatedAt: graduateUpdatedAt,
  isFetching: isFetchingGraduate,
});

export default graduateReducer;
