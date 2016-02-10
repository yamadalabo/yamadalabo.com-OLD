import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import findIndex from 'lodash/array/findIndex';
import { loadWorks, resetErrorMessage } from '../actions';
import PageNavigator from '../components/PageNavigator';
import PostNavigator from '../components/PostNavigator';
import Post from '../components/Post';
import { WORKS } from '../constants/PageTypes';
import { PROFESSOR, GRADUATE } from '../constants/AuthorTypes';

class WorksPost extends Component {
  componentDidMount() {
    this.handleLoad();
  }

  handleLoad() {
    const { author } = this.props.routeParams;
    const { entities, isFetching } = this.props[author];
    if (!isFetching && entities.length === 0) {
      this.props.loadWorks(author);
    }
  }

  renderPostNavigator() {
    const { author, work, id } = this.props.routeParams;
    const { isFetching, entities } = this.props[author];
    if (!isFetching && entities.length !== 0) {
      const filteredEntities = entities.filter(entity => entity.workType === work)
                                       .sort((a, b) => {
                                         if (a.timestamp > b.timestamp) {
                                           return -1;
                                         } else if (a.timestamp < b.timestamp) {
                                           return 1;
                                         }
                                         return 0;
                                       });
      const selectedIndex = findIndex(filteredEntities, entity => entity.id === parseInt(id, 10));
      const prevEntity = filteredEntities[selectedIndex - 1];
      const nextEntity = filteredEntities[selectedIndex + 1];
      const prevPath = prevEntity ? `${WORKS}/${author}/${work}/${prevEntity.id}` : null;
      const nextPath = nextEntity ? `${WORKS}/${author}/${work}/${nextEntity.id}` : null;

      return (
        <PostNavigator
          prevPath={prevPath}
          nextPath={nextPath}
        />
      );
    }
  }

  renderMainSection() {
    const { author, id } = this.props.routeParams;
    if (!this.props[author]) {
      return (
        <div className="post">
          <h1>No Author {author}</h1>
        </div>
      );
    }
    const { isFetching, entities } = this.props[author];
    if (isFetching) {
      return (
        <div className="post">
          <h1>Loading</h1>
        </div>
      );
    }
    const selectedEntity = entities.find(entity => entity.id === parseInt(id, 10));
    if (!selectedEntity) {
      return (
        <div className="post">
          <h1>No work</h1>
        </div>
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
  professor: PropTypes.shape({
    entities: PropTypes.array.isRequired,
    updatedAt: PropTypes.number,
    isFetching: PropTypes.bool.isRequired,
  }),
  graduate: PropTypes.shape({
    entities: PropTypes.array.isRequired,
    updatedAt: PropTypes.number,
    isFetching: PropTypes.bool.isRequired,
  }),
  errorMessage: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    [PROFESSOR]: state.professor,
    [GRADUATE]: state.graduate,
    errorMessage: state.errorMessage,
  };
}

export default connect(mapStateToProps, {
  loadWorks,
  resetErrorMessage,
})(WorksPost);
