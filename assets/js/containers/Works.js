import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadWorks, resetErrorMessage } from '../actions';
import isEmpty from 'lodash/lang/isEmpty';
import PageNavigator from '../components/PageNavigator';
import WorksNavigator from '../components/WorksNavigator';
import PostsDetailed from '../components/PostsDetailed';
import { PROFESSOR, GRADUATE } from '../constants/AuthorTypes';
import { PAPER } from '../constants/WorkTypes';

export default class Works extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedAuthor: PROFESSOR,
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
    if (entities.length === 0) {
      return (
        <div className="message">
          <h1>No Work</h1>
        </div>
      );
    }
    return <PostsDetailed entities={entities} />;
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
