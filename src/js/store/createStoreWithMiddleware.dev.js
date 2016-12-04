import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootSaga from '../sagas';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(createSagaMiddleware(rootSaga),
  logger, thunk)(createStore);
export default createStoreWithMiddleware;
