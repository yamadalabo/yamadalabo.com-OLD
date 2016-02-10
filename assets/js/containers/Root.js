import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import Home from './Home';
import NewsPost from './NewsPost';
import NewsPosts from './NewsPosts';
import WorksPost from './WorksPost';
import WorksPosts from './WorksPosts';
import Profile from './Profile';
import SeminarPost from './SeminarPost';
import SeminarPosts from './SeminarPosts';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Home} />
          <Route path="/news" component={NewsPosts} />
          <Route path="/news/:id" components={NewsPost} />
          <Route path="/works" component={WorksPosts} />
          <Route path="/works/:author/:work/:id" component={WorksPost} />
          <Route path="/profile" component={Profile} />
          <Route path="/seminar" component={SeminarPosts} />
          <Route path="/seminar/:id" component={SeminarPost} />
        </Router>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
