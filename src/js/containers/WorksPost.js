import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import findIndex from 'lodash/array/findIndex';
import load from '../actions/async/works';
import { changeFilter, resetError } from '../actions/sync/works';
import PageNavigator from '../components/PageNavigator';
import PostNavigator from '../components/PostNavigator';
import Post from '../components/Post';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { PAPER, BOOK, WORK_BY_GRADUATE, OTHERS } from '../constants/Works';

const WORK_FILTERS = {
  all: () => true,
  paper: entity => entity.workType === PAPER,
  book: entity => entity.workType === BOOK,
  graduatework: entity => entity.workType === WORK_BY_GRADUATE,
  others: entity => entity.workType === OTHERS,
};

class WorksPost extends Component {
  componentDidMount() {
    const { entities, error } = this.props;
    if (error !== null) {
      this.props.resetError();
    }
    if (entities.length === 0) {
      this.props.load();
    }
  }

  renderPostNavigator() {
    const { entities, routeParams: { workFilter, id } } = this.props;
    const filteredEntities = entities.filter(WORK_FILTERS[workFilter])
                                     .sort((a, b) => {
                                       if (a.timestamp > b.timestamp) {
                                         return -1;
                                       } else if (a.timestamp < b.timestamp) {
                                         return 1;
                                       }
                                       return 0;
                                     });
    const index = findIndex(filteredEntities, entity => entity.id === parseInt(id, 10));

    if (index !== -1) {
      const prevEntity = filteredEntities[index - 1];
      const nextEntity = filteredEntities[index + 1];
      const prevPath = prevEntity ? `/works/${workFilter}/${prevEntity.id}` : null;
      const nextPath = nextEntity ? `/works/${workFilter}/${nextEntity.id}` : null;
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

    const selectedEntity = entities.find(entity => entity.id === parseInt(id, 10));
    if (!isFetching && !selectedEntity) {
      return (
        <ErrorMessage
          message="No work found."
        />
      );
    }

    return (
      <Post
        title={selectedEntity.title}
        body={selectedEntity.body}
        timestamp={selectedEntity.timestamp}
      />
    );
  }

  render() {
    const { entities, isFetching } = this.props;
    const isEmpty = entities.length === 0;
    return (
      <div className="post">
        <PageNavigator />
        {!isFetching && !isEmpty ? this.renderPostNavigator() : null}
        <div className="content">
          {this.renderMainSection()}
        </div>
      </div>
    );
  }
}

WorksPost.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  load: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
  routeParams: PropTypes.shape({
    workFilter: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    entities: state.works.entities,
    isFetching: state.works.isFetching,
    error: state.works.error,
  };
}

export default connect(mapStateToProps, {
  changeFilter,
  load,
  resetError,
})(WorksPost);
