import { combineReducers } from 'redux';
import { WORKS_REQUEST, WORKS_SUCCESS, WORKS_FAILURE } from '../actions';
import { PROFESSOR } from '../constants/AuthorTypes';

function professorEntities(state = [], action) {
  const { type, payload, authorType } = action;
  if (authorType === PROFESSOR && type === WORKS_SUCCESS) {
    // Need to keep uniqueness of element
    return [...state, ...payload.entities];
  }
  return state;
}

function professorUpdatedAt(state = null, action) {
  const { type, payload, authorType } = action;
  if (authorType === PROFESSOR && type === WORKS_SUCCESS) {
    return payload.updatedAt;
  }
  return state;
}

function isFetchingProfessor(state = false, action) {
  const { type, authorType } = action;
  if (authorType === PROFESSOR && type === WORKS_REQUEST) {
    return true;
  } else if (authorType === PROFESSOR && (type === WORKS_SUCCESS || type === WORKS_FAILURE)) {
    return false;
  }

  return state;
}

const professorReducer = combineReducers({
  entities: professorEntities,
  updatedAt: professorUpdatedAt,
  isFetching: isFetchingProfessor,
});

export default professorReducer;
