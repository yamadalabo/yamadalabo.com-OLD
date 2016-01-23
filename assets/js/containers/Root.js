import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './Home';
import News from './News';
import Works from './Works';
import Profile from './Profile';
import Seminar from './Seminar';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="news(/:id)" component={News} />
            <Route path="works" component={Works} />
            <Route path="profile" component={Profile} />
            <Route path="seminar(/:id)" component={Seminar} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
