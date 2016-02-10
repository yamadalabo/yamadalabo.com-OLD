import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import findIndex from 'lodash/array/findIndex';
import moment from 'moment';
import { loadNews, resetNews, resetErrorMessage } from '../actions';
import PageNavigator from '../components/PageNavigator';
import PostNavigator from '../components/PostNavigator';
import Post from '../components/Post';
import { NEWS } from '../constants/PageTypes';

class NewsPost extends Component {
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

  renderPostNavigator() {
    const { entities, isFetching, routeParams: { id } } = this.props;
    if (!isFetching && entities.length !== 0) {
      const selectedIndex = findIndex(entities, entity => entity.id === parseInt(id, 10));
      const prevEntity = entities[selectedIndex - 1];
      const nextEntity = entities[selectedIndex + 1];
      const prevPath = prevEntity ? `${NEWS}/${prevEntity.id}` : null;
      const nextPath = nextEntity ? `${NEWS}/${nextEntity.id}` : null;

      return (
        <PostNavigator
          prevPath={prevPath}
          nextPath={nextPath}
        />
      );
    }
  }

  renderMainSection() {
    const { isFetching, entities, routeParams: { id } } = this.props;
    if (isFetching) {
      return (
        <div className="post">
          <h1>Loading</h1>
        </div>
      );
    }
    const selectedPost = entities.find(entity => entity.id === parseInt(id, 10));
    if (typeof selectedPost === 'undefined') {
      return (
        <div className="post">
          <h1>No work found.</h1>
        </div>
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
    return (
      <div className="app">
        <PageNavigator />
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
})(NewsPost);
