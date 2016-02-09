import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import findIndex from 'lodash/array/findIndex';
import { loadWorks, resetErrorMessage } from '../actions';
import PageNavigator from '../components/PageNavigator';
import PostNavigator from '../components/PostNavigator';
import WorkSelector from '../components/WorkSelector';
import Posts from '../components/Posts';
import Post from '../components/Post';
import { WORKS } from '../constants/PageTypes';
import { PROFESSOR, GRADUATE } from '../constants/AuthorTypes';
import { PAPER } from '../constants/WorkTypes';

export default class Works extends Component {
  constructor(props) {
    super(props);
    const { author: selectedAuthor, work: selectedWork } = this.props.routeParams;
    const initAuthor = (selectedAuthor === PROFESSOR || selectedAuthor === GRADUATE) ? selectedAuthor : PROFESSOR;
    const initWork = selectedWork ? selectedWork : PAPER;
    this.state = {
      selectedAuthor: initAuthor,
      selectedWork: initWork,
    };
    this.handleShowByAuthor = this.handleShowByAuthor.bind(this);
    this.handleShowByWork = this.handleShowByWork.bind(this);
  }

  componentDidMount() {
    this.handleLoad();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.selectedAuthor !== this.state.selectedAuthor) {
      this.handleLoad();
    }
  }

  handleLoad() {
    const author = this.state.selectedAuthor;
    const isFetching = this.props[author].isFetching;
    if (this.props[author].entities.length === 0 && !isFetching) {
      this.props.loadWorks(author);
    }
  }

  handleShowByAuthor(author) {
    this.setState({ selectedAuthor: author });
  }

  handleShowByWork(work) {
    this.setState({ selectedWork: work });
  }

  renderPostNavigator() {
    const { author, work, id } = this.props.routeParams;
    if (author && work && id && this.props[author].entities.length !== 0 && !this.props[author].isFetching) {
      const filteredEntities = this.props[author].entities.filter(entity => {
        return entity.workType === work;
      });
      const selectedIndex = findIndex(filteredEntities, entity => {
        return entity.id === parseInt(id, 10);
      });
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

  renderWorkSelector() {
    if (!this.props.routeParams.author || !this.props.routeParams.id) {
      return (
        <WorkSelector
          handleShowByAuthor={this.handleShowByAuthor}
          handleShowByWork={this.handleShowByWork}
          selectedAuthor={this.state.selectedAuthor}
          selectedWork={this.state.selectedWork}
        />
      );
    }
  }

  renderPost() {
    const { author, id } = this.props.routeParams;
    if (!this.props[author]) {
      return (
        <div className="post">
          <h1>No Author {this.props.routeParams.author}</h1>
        </div>
      );
    } else if (this.props[author].isFetching) {
      return (
        <div className="post">
          <h1>Loading</h1>
        </div>
      );
    }
    const selectedEntity = this.props[author].entities.find(entity => {
      return entity.id === parseInt(id, 10);
    });
    if (!selectedEntity) {
      return (
        <div className="post">
          <h1>No Work Post</h1>
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

  renderPosts() {
    const { selectedAuthor: author, selectedWork: workType } = this.state;
    if (this.props[author].isFetching) {
      return (
        <div className="post">
          <h1>Loading</h1>
        </div>
      );
    }
    const filteredEntities = this.props[author].entities.filter(entity => {
      return entity.workType === workType;
    });
    if (filteredEntities.length === 0) {
      return (
        <div className="post">
          <h1>No Work</h1>
        </div>
      );
    }

    return (
      <Posts
        pagePath={`${WORKS}/${author}/${workType}`}
        entities={filteredEntities}
      />
    );
  }

  renderSection() {
    if (this.props.routeParams.author && this.props.routeParams.id) {
      return this.renderPost();
    }
    return this.renderPosts();
  }

  render() {
    return (
      <div className="app">
        <PageNavigator />
        {this.renderWorkSelector()}
        {this.renderPostNavigator()}
        <div className="content">
          {this.renderSection()}
        </div>
      </div>
    );
  }
}

Works.propTypes = {
  routeParams: PropTypes.object,
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
})(Works);
