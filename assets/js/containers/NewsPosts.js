import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { loadNews, resetNews, resetErrorMessage } from '../actions';
import PageNavigator from '../components/PageNavigator';
import Posts from '../components/Posts';
import { NEWS } from '../constants/PageTypes';

class NewsPosts extends Component {
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
      this.props.resetNews();
      this.props.loadNews();
    }
  }

  handleClick() {
    const { isFetching } = this.props;
    if (!isFetching) {
      this.props.loadNews();
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
        pagePath={NEWS}
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

NewsPosts.propTypes = {
  loadNews: PropTypes.func.isRequired,
  resetNews: PropTypes.func.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  entities: PropTypes.array.isRequired,
  updatedAt: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  shouldReload: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    entities: state.news.entities,
    updatedAt: state.news.updatedAt,
    isFetching: state.news.isFetching,
    shouldReload: state.news.shouldReload,
    errorMessage: state.errorMessage,
  };
}

export default connect(mapStateToProps, {
  loadNews,
  resetNews,
  resetErrorMessage,
})(NewsPosts);
