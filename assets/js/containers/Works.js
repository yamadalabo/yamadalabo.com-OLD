import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadWorks, resetErrorMessage } from '../actions';
import isEmpty from 'lodash/lang/isEmpty';
import WorksNavigator from '../components/WorksNavigator';
import Article from '../components/Article';
import { PROFESSOR, GRADUATE } from '../constants/AuthorTypes';

export default class Works extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedAuthor: PROFESSOR,
    };
    this.handleShowByAuthor = this.handleShowByAuthor.bind(this);
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

  render() {
    const author = this.state.selectedAuthor;
    return (
      <div className="app-container">
        <WorksNavigator handleShowByAuthor={this.handleShowByAuthor} />
        {
          this.props[author].entities.map(entity => {
            return (
              <div className="content">
                <Article
                  title={entity.title}
                  body={entity.body}
                  timestamp={entity.timestamp}
                />
              </div>
            );
          })
        }
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
