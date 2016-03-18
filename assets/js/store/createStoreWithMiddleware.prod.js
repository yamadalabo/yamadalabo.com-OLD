import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const createStoreWithMiddleware = applyMiddleware(createSagaMiddleware(rootSaga))(createStore);
export default createStoreWithMiddleware;
