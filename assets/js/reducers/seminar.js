import { combineReducers } from 'redux';
import { SEMINAR_REQUEST, SEMINAR_SUCCESS, SEMINAR_FAILURE } from '../actions';

function seminarEntities(state = [], action) {
  const { type, payload } = action;
  if (type === SEMINAR_SUCCESS) {
    // Need to keep uniqueness of element
    return [...state, ...payload.entities];
  }
  return state;
}

function seminarOffset(state = 0, action) {
  const { type, payload } = action;
  if (type === SEMINAR_SUCCESS) {
    return payload.offset;
  }
  return state;
}

function seminarUpdatedAt(state = null, action) {
  const { type, payload } = action;
  if (type === SEMINAR_SUCCESS) {
    return payload.updatedAt;
  }
  return state;
}

function isFetchingSeminar(state = false, action) {
  const { type } = action;
  switch (type) {
    case SEMINAR_REQUEST:
      return true;
    case SEMINAR_SUCCESS:
    case SEMINAR_FAILURE:
      return false;
    default:
      return state;
  }
}

function shouldReloadSeminar(state = false, action) {
  const { type, payload } = action;
  if (type === SEMINAR_SUCCESS) {
    return payload.shouldReload;
  }
  return state;
}

const seminarReducer = combineReducers({
  entities: seminarEntities,
  offset: seminarOffset,
  updatedAt: seminarUpdatedAt,
  isFetching: isFetchingSeminar,
  shouldReload: shouldReloadSeminar,
});

export default seminarReducer;
