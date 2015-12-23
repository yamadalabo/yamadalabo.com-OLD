import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as WorkActions from '../actions';
import MainSection from '../components/MainSection';

class App extends Component {

  componentDidMount() {
    const { fetchWorks } = this.props.actions;
    fetchWorks();
  }

  render() {
    const { works, isFetching, errorMessage } = this.props;

    return (
      <MainSection
        works={works}
        isFetching={isFetching}
        errorMessage={errorMessage}
      />
    );
  }
}

App.propTypes = {
  works: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    works: state.works,
    isFetching: state.isFetching,
    errorMessage: state.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(WorkActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
