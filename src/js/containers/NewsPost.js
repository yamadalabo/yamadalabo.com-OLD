import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import findIndex from 'lodash/array/findIndex';
import moment from 'moment';
import { loadNews, resetNews, resetErrorMessage } from '../actions';
import PageNavigator from '../components/PageNavigator';
import PostNavigator from '../components/PostNavigator';
import Post from '../components/Post';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

class NewsPost extends Component {
  componentDidMount() {
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

  isEmpty() {
    const { entities } = this.props;
    return entities.length === 0;
  }

  renderPostNavigator() {
    const { entities, routeParams: { id } } = this.props;
    const sortedEntities = entities.sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return -1;
      } else if (a.timestamp < b.timestamp) {
        return 1;
      }
      return 0;
    });
    const index = findIndex(sortedEntities, entity => entity.id === parseInt(id, 10));
    if (index !== -1) {
      const prevEntity = sortedEntities[index - 1];
      const nextEntity = sortedEntities[index + 1];
      const prevPath = prevEntity ? `/news/${prevEntity.id}` : null;
      const nextPath = nextEntity ? `/news/${nextEntity.id}` : null;

      return (
        <PostNavigator
          prevPath={prevPath}
          nextPath={nextPath}
        />
      );
    }
    return null;
  }

  renderMainSection() {
    const { isFetching, errorMessage, entities, routeParams: { id } } = this.props;
    if (isFetching) {
      return (
        <Loading />
      );
    } else if (errorMessage) {
      return (
        <ErrorMessage
          message={errorMessage}
        />
      );
    }

    const selectedPost = entities.find(entity => entity.id === parseInt(id, 10));
    if (typeof selectedPost === 'undefined') {
      return (
        <ErrorMessage
          message="No work found."
        />
      );
    }

    return (
      <Post
        title={selectedPost.title}
        body={selectedPost.body}
        timestamp={selectedPost.timestamp}
      />
    );
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div className="app">
        <PageNavigator />
        {!isFetching && !this.isEmpty() ? this.renderPostNavigator() : null}
        {this.renderPostNavigator()}
        <div className="content">
          {this.renderMainSection()}
        </div>
      </div>
    );
  }
}

NewsPost.propTypes = {
  routeParams: PropTypes.object.isRequired,
  loadNews: PropTypes.func.isRequired,
  resetNews: PropTypes.func.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  entities: PropTypes.array.isRequired,
  updatedAt: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    entities: state.news.entities,
    updatedAt: state.news.updatedAt,
    isFetching: state.news.isFetching,
    errorMessage: state.errorMessage,
  };
}

export default connect(mapStateToProps, {
  loadNews,
  resetNews,
  resetErrorMessage,
})(NewsPost);
