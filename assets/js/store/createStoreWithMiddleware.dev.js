import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import api from '../middleware/api';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(api, thunkMiddleware, logger)(createStore);
export default createStoreWithMiddleware;
