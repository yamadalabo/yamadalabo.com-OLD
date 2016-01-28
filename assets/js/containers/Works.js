import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadWorks, resetErrorMessage } from '../actions';
import isEmpty from 'lodash/lang/isEmpty';
import PageNavigator from '../components/PageNavigator';
import WorksNavigator from '../components/WorksNavigator';
import Posts from '../components/Posts';
import Post from '../components/Post';
import { WORKS } from '../constants/PageTypes';
import { PROFESSOR, GRADUATE } from '../constants/AuthorTypes';
import { PAPER } from '../constants/WorkTypes';

export default class Works extends Component {
  constructor(props) {
    super(props);
    const selectedAuthor = this.props.routeParams.author;
    const initAuthor = (selectedAuthor === PROFESSOR || selectedAuthor === GRADUATE) ? selectedAuthor : PROFESSOR;
    this.state = {
      selectedAuthor: initAuthor,
      selectedWork: PAPER,
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
    if (isEmpty(this.props[author].entities) && !isFetching) {
      this.props.loadWorks(author);
    }
  }

  handleShowByAuthor(author) {
    this.setState({ selectedAuthor: author });
  }

  handleShowByWork(work) {
    this.setState({ selectedWork: work });
  }

  renderWorksSection(entities) {
    const author = this.state.selectedAuthor;
    if (this.props[author].isFetching) {
      return (
        <div className="post">
          <h1>Loading</h1>
        </div>
      );
    } else if (entities.length === 0) {
      return (
        <div className="post">
          <h1>No Work</h1>
        </div>
      );
    } else if (!this.props.routeParams.id) {
      return (
        <Posts
          pagePath={`${WORKS}/${author}`}
          entities={entities}
        />
       );
    }
    const selectedPost = this.props[author].entities.find(entity => {
      return entity.id === parseInt(this.props.routeParams.id, 10);
    });
    return (
      <Post
        title={selectedPost.title}
        body={selectedPost.body}
        timestamp={selectedPost.timestamp}
      />
    );
  }

  render() {
    const author = this.state.selectedAuthor;
    const selectedWork = this.state.selectedWork;
    const filteredEntities = this.props[author].entities.filter(entity => {
      return entity.workType === selectedWork;
    });
    return (
      <div className="app">
        <PageNavigator />
        <WorksNavigator
          handleShowByAuthor={this.handleShowByAuthor}
          handleShowByWork={this.handleShowByWork}
        />
        <div className="content">
          {this.renderWorksSection(filteredEntities)}
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
