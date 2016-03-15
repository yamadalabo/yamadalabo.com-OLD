import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { loadNews, resetNews, resetErrorMessage } from '../actions';
import PageNavigator from '../components/PageNavigator';
import Posts from '../components/Posts';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

class NewsPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowLoading: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ shouldShowLoading: false });
    }, 1000);
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
    return (
      <button onClick={this.handleClick}>
        Reload
      </button>
    );
  }

  renderMainSection() {
    const { isFetching, entities } = this.props;
    const { shouldShowLoading } = this.state;
    if (isFetching || shouldShowLoading) {
      return (
        <Loading />
      );
    } else if (entities.length === 0) {
      return (
        <ErrorMessage
          message="No work found."
        />
      );
    }

    return (
      <Posts
        pagePath="/news"
        entities={entities}
      />
    );
  }

  render() {
    const { shouldReload } = this.props;
    return (
      <div className="app">
        <PageNavigator />
        <div className="content">
          {this.renderMainSection()}
          {shouldReload ? this.renderReloadButton() : null}
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
