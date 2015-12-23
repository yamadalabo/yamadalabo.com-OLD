import { combineReducers } from 'redux';
import { REQUEST_WORKS_START, REQUEST_WORKS_SUCCESS, REQUEST_WORKS_FAILED } from '../constants/ActionTypes';

function isFetching(state = false, action) {
  switch (action.type) {
    case REQUEST_WORKS_START:
      return true;
    case REQUEST_WORKS_SUCCESS:
    case REQUEST_WORKS_FAILED:
      return false;
    default:
      return state;
  }
}

function errorMessage(state = '', action) {
  switch (action.type) {
    case REQUEST_WORKS_FAILED:
      return action.error;
    case REQUEST_WORKS_START:
    case REQUEST_WORKS_SUCCESS:
      return '';
    default:
      return state;
  }
}

function works(state = [], action) {
  switch (action.type) {
    case REQUEST_WORKS_SUCCESS:
      return action.works;
    case REQUEST_WORKS_START:
    case REQUEST_WORKS_FAILED:
      return [];
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  works,
  isFetching,
  errorMessage,
});

export default rootReducer;
