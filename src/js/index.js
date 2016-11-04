import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createHashHistory } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';
import createStoreWithMiddleware from './store/createStoreWithMiddleware';
import reducers from './reducers';
import Root from './containers/Root';

const store = createStoreWithMiddleware(reducers);
const history = createHashHistory();

syncReduxAndRouter(history, store);

render(
  <Root
    store={store}
    history={history}
  />,
  document.getElementById('container')
);
