import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { loadSeminar, resetSeminar, resetErrorMessage } from '../actions';
import PageNavigator from '../components/PageNavigator';
import Posts from '../components/Posts';
import { SEMINAR } from '../constants/PageTypes';

class SeminarPosts extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.handleLoad();
  }

  componentDidUpdate() {
    this.handleLoad();
  }

  handleLoad() {
    const { updatedAt, errorMessage, isFetching } = this.props;
    const updatedTime = moment.unix(updatedAt);
    const now = moment();
    if (errorMessage) {
      this.props.resetErrorMessage();
    }
    if (!isFetching && (updatedAt === null || now.diff(updatedTime, 'minutes') > 30)) {
      this.props.resetSeminar();
      this.props.loadSeminar();
    }
  }

  handleClick() {
    const { isFetching } = this.props;
    if (!isFetching) {
      this.props.loadSeminar();
    }
  }

  renderReloadButton() {
    const { shouldReload } = this.props;
    if (shouldReload) {
      return (
        <button onClick={this.handleClick}>
          Reload
        </button>
      );
    }
  }

  renderMainSection() {
    const { isFetching, entities } = this.props;
    if (isFetching && entities.length === 0) {
      return (
        <div className="post">
          <h1>Loading</h1>
        </div>
      );
    }

    return (
      <Posts
        pagePath={SEMINAR}
        entities={entities}
      />
    );
  }

  render() {
    return (
      <div className="app">
        <PageNavigator />
        <div className="content">
          {this.renderMainSection()}
          {this.renderReloadButton()}
        </div>
      </div>
    );
  }
}

SeminarPosts.propTypes = {
  loadSeminar: PropTypes.func.isRequired,
  resetSeminar: PropTypes.func.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  entities: PropTypes.array.isRequired,
  updatedAt: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  shouldReload: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    entities: state.seminar.entities,
    updatedAt: state.seminar.updatedAt,
    isFetching: state.seminar.isFetching,
    shouldReload: state.seminar.shouldReload,
    errorMessage: state.errorMessage,
  };
}

export default connect(mapStateToProps, {
  loadSeminar,
  resetSeminar,
  resetErrorMessage,
})(SeminarPosts);
