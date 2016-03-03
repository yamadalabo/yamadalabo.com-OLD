import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import findIndex from 'lodash/array/findIndex';
import { loadWorks, resetErrorMessage } from '../actions';
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
    this.handleLoad();
  }

  handleLoad() {
    const { entities, isFetching } = this.props;
    if (!isFetching && entities.length === 0) {
      this.props.loadWorks();
    }
  }

  renderPostNavigator() {
    const { routeParams: { workFilter, id }, isFetching, entities } = this.props;
    if (!isFetching && entities.length !== 0) {
      const filteredEntities = entities.filter(WORK_FILTERS[workFilter])
                                       .sort((a, b) => {
                                         if (a.timestamp > b.timestamp) {
                                           return -1;
                                         } else if (a.timestamp < b.timestamp) {
                                           return 1;
                                         }
                                         return 0;
                                       });
      const selectedIndex = findIndex(filteredEntities, entity => entity.id === parseInt(id, 10));

      if (selectedIndex !== -1) {
        const prevEntity = filteredEntities[selectedIndex - 1];
        const nextEntity = filteredEntities[selectedIndex + 1];
        const prevPath = prevEntity ? `/works/${workFilter}/${prevEntity.id}` : null;
        const nextPath = nextEntity ? `/works/${workFilter}/${nextEntity.id}` : null;
        return (
          <PostNavigator
            prevPath={prevPath}
            nextPath={nextPath}
          />
        );
      }
    }
  }

  renderMainSection() {
    const { routeParams: { id }, isFetching, entities } = this.props;
    if (isFetching) {
      return (
        <Loading />
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
    return (
      <div className="post">
        <PageNavigator />
        {this.renderPostNavigator()}
        <div className="content">
          {this.renderMainSection()}
        </div>
      </div>
    );
  }
}

WorksPost.propTypes = {
  routeParams: PropTypes.object.isRequired,
  loadWorks: PropTypes.func.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  entities: PropTypes.array.isRequired,
  updatedAt: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    entities: state.works.entities,
    updatedAt: state.works.updatedAt,
    isFetching: state.works.isFetching,
    errorMessage: state.errorMessage,
  };
}

export default connect(mapStateToProps, {
  loadWorks,
  resetErrorMessage,
})(WorksPost);
