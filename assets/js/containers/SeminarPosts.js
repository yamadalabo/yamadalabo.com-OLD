import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { loadSeminar, resetSeminar, resetErrorMessage } from '../actions';
import PageNavigator from '../components/PageNavigator';
import Posts from '../components/Posts';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

class SeminarPosts extends Component {
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
        pagePath="/seminar"
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
