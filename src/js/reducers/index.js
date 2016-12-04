import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import news from './news';
import works from './works';
import seminar from './seminar';

const reducers = combineReducers({
  news,
  works,
  seminar,
  routing: routeReducer,
});

export default reducers;
