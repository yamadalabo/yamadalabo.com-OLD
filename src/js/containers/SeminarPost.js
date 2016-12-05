import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import findIndex from 'lodash/array/findIndex';
import load from '../actions/async/seminar';
import { resetError } from '../actions/sync/seminar';
import PageNavigator from '../components/PageNavigator';
import PostNavigator from '../components/PostNavigator';
import Post from '../components/Post';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

class SeminarPost extends Component {
  componentDidMount() {
    const { entities, error, isFetching } = this.props;
    if (error !== null) {
      this.props.resetError();
    }
    if (entities.length === 0 && !isFetching) {
      this.props.load();
    }
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
    const { isFetching, error, entities, routeParams: { id } } = this.props;
    if (isFetching) {
      return (
        <Loading />
      );
    } else if (error) {
      return (
        <ErrorMessage
          message={error}
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
    const { entities, isFetching } = this.props;
    const isEmpty = entities.length === 0;
    return (
      <div className="app">
        <PageNavigator />
        {!isFetching && !isEmpty ? this.renderPostNavigator() : null}
        <div className="content">
          {this.renderMainSection()}
        </div>
      </div>
    );
  }
}

SeminarPost.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  load: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
  routeParams: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    entities: state.seminar.entities,
    isFetching: state.seminar.isFetching,
    error: state.seminar.error,
  };
}

export default connect(mapStateToProps, {
  load,
  resetError,
})(SeminarPost);
