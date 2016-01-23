import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import api from '../middleware/api';

const createStoreWithMiddleware = applyMiddleware(api, thunkMiddleware)(createStore);
export default createStoreWithMiddleware;
