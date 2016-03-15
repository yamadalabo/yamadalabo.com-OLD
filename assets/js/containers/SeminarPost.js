import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import findIndex from 'lodash/array/findIndex';
import moment from 'moment';
import { loadSeminar, resetSeminar, resetErrorMessage } from '../actions';
import PageNavigator from '../components/PageNavigator';
import PostNavigator from '../components/PostNavigator';
import Post from '../components/Post';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

class SeminarPost extends Component {
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

  isEmpty() {
    const { entities } = this.props;
    return entities.length === 0;
  }

  renderPostNavigator() {
    const { entities, routeParams: { id } } = this.props;
    const index = findIndex(entities, entity => entity.id === parseInt(id, 10));
    if (index !== -1) {
      const prevEntity = entities[index - 1];
      const nextEntity = entities[index + 1];
      const prevPath = prevEntity ? `/seminar/${prevEntity.id}` : null;
      const nextPath = nextEntity ? `/seminar/${nextEntity.id}` : null;

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
    const { isFetching, entities, routeParams: { id } } = this.props;
    if (isFetching) {
      return (
        <Loading />
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
        <div className="content">
          {this.renderMainSection()}
        </div>
      </div>
    );
  }
}

SeminarPost.propTypes = {
  routeParams: PropTypes.object.isRequired,
  loadSeminar: PropTypes.func.isRequired,
  resetSeminar: PropTypes.func.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  entities: PropTypes.array.isRequired,
  updatedAt: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    entities: state.seminar.entities,
    updatedAt: state.seminar.updatedAt,
    isFetching: state.seminar.isFetching,
    errorMessage: state.errorMessage,
  };
}

export default connect(mapStateToProps, {
  loadSeminar,
  resetSeminar,
  resetErrorMessage,
})(SeminarPost);
