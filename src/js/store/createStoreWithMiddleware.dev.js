import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore);
export default createStoreWithMiddleware;
