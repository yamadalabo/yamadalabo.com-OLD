import React, { Component, PropTypes } from 'react';
import PageNavigator from '../components/PageNavigator';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <PageNavigator />
        {this.props.children}
        <PageNavigator />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};
