import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadWorks, resetErrorMessage } from '../actions';
import PageNavigator from '../components/PageNavigator';
import WorkSelector from '../components/WorkSelector';
import Posts from '../components/Posts';
import { WORKS } from '../constants/PageTypes';
import { PROFESSOR, GRADUATE } from '../constants/AuthorTypes';
import { PAPER } from '../constants/WorkTypes';

class WorksPosts extends Component {
  constructor(props) {
    super(props);
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
    const { selectedAuthor } = this.state;
    if (prevState.selectedAuthor !== selectedAuthor) {
      this.handleLoad();
    }
  }

  handleLoad() {
    const { selectedAuthor } = this.state;
    const { isFetching, entities } = this.props[selectedAuthor];
    if (!isFetching && entities.length === 0) {
      this.props.loadWorks(this.state.selectedAuthor);
    }
  }

  handleShowByAuthor(author) {
    this.setState({ selectedAuthor: author });
  }

  handleShowByWork(work) {
    this.setState({ selectedWork: work });
  }

  renderMainSection() {
    const { selectedAuthor, selectedWork } = this.state;
    const { isFetching, entities } = this.props[selectedAuthor];
    if (isFetching) {
      return (
        <div className="post">
          <h1>Loading</h1>
        </div>
      );
    }
    const filteredEntities = entities.filter(entity => entity.workType === selectedWork)
                                     .sort((a, b) => {
                                       if (a.timestamp > b.timestamp) {
                                         return -1;
                                       } else if (a.timestamp < b.timestamp) {
                                         return 1;
                                       }
                                       return 0;
                                     });
    if (filteredEntities.length === 0) {
      return (
        <div className="post">
          <h1>{`${selectedAuthor} has no ${selectedWork}`}</h1>
        </div>
      );
    }

    return (
      <Posts
        pagePath={`${WORKS}/${selectedAuthor}/${selectedWork}`}
        entities={filteredEntities}
      />
    );
  }

  render() {
    const { selectedAuthor, selectedWork } = this.state;
    return (
      <div className="app">
        <PageNavigator />
        <WorkSelector
          handleShowByAuthor={this.handleShowByAuthor}
          handleShowByWork={this.handleShowByWork}
          selectedAuthor={selectedAuthor}
          selectedWork={selectedWork}
        />
        <div className="content">
          {this.renderMainSection()}
        </div>
      </div>
    );
  }
}

WorksPosts.propTypes = {
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
})(WorksPosts);
