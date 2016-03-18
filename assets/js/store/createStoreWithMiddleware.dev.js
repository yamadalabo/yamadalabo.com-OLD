import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import rootSaga from '../sagas';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(createSagaMiddleware(rootSaga),
  logger)(createStore);
export default createStoreWithMiddleware;
