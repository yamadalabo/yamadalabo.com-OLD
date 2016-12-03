import { combineReducers } from 'redux';
import { RESET_ERROR_MESSAGE, NEWS_FAILURE,
         PROFESSOR_FAILURE, GRADUATE_FAILURE, SEMINAR_FAILURE } from '../actions';
import { routeReducer } from 'redux-simple-router';
import { reducer as news } from './news';
import worksReducer from './works';
import seminarReducer from './seminar';

function errorMessage(state = null, action) {
  const { type, error } = action;
  switch (type) {
    case NEWS_FAILURE:
    case PROFESSOR_FAILURE:
    case GRADUATE_FAILURE:
    case SEMINAR_FAILURE:
      return error;
    case RESET_ERROR_MESSAGE:
      return null;
    default:
      return state;
  }
}

const reducers = combineReducers({
  news,
  works: worksReducer,
  seminar: seminarReducer,
  routing: routeReducer,
  errorMessage,
});

export default reducers;
