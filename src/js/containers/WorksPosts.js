import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import load from '../actions/async/works';
import { changeFilter, resetError } from '../actions/sync/works';
import PageNavigator from '../components/PageNavigator';
import WorksSelector from '../components/WorksSelector';
import Posts from '../components/Posts';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { SHOW_ALL, SHOW_PAPER, SHOW_BOOK,
         SHOW_WORK_BY_GRADUATE, SHOW_OTHERS } from '../constants/WorksFilters';
import { PAPER, BOOK, WORK_BY_GRADUATE, OTHERS } from '../constants/Works';

const WORKS_FILTER_PROPS = {
  [SHOW_ALL]: {
    path: '/works/all',
    func: () => true,
  },
  [SHOW_PAPER]: {
    path: '/works/paper',
    func: entity => entity.workType === PAPER,
  },
  [SHOW_BOOK]: {
    path: '/works/book',
    func: entity => entity.workType === BOOK,
  },
  [SHOW_WORK_BY_GRADUATE]: {
    path: '/works/graduatework',
    func: entity => entity.workType === WORK_BY_GRADUATE,
  },
  [SHOW_OTHERS]: {
    path: '/works/others',
    func: entity => entity.workType === OTHERS,
  },
};

class WorksPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowLoading: true,
    };
    this.handleShowByWorksFilter = this.handleShowByWorksFilter.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ shouldShowLoading: false });
    }, 1000);
    const { entities, error } = this.props;
    if (error !== null) {
      this.props.resetError();
    }
    if (entities.length === 0) {
      this.props.load();
    }
  }

  handleShowByWorksFilter(filter) {
    this.props.changeFilter(filter);
  }

  renderMainSection() {
    const { isFetching, error, entities, filter } = this.props;
    const { shouldShowLoading } = this.state;
    if (isFetching || shouldShowLoading) {
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

    const filteredEntities = entities.filter(WORKS_FILTER_PROPS[filter].func)
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
        <ErrorMessage
          message="No work found."
        />
      );
    }

    return (
      <Posts
        pagePath={`${WORKS_FILTER_PROPS[filter].path}`}
        entities={filteredEntities}
      />
    );
  }

  render() {
    const { filter } = this.props;
    return (
      <div className="app">
        <PageNavigator />
        <WorksSelector
          handleShowByWorksFilter={this.handleShowByWorksFilter}
          selectedWorksFilter={filter}
        />
        <div className="content">
          {this.renderMainSection()}
        </div>
      </div>
    );
  }
}

WorksPosts.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  entities: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  error: PropTypes.string,
  filter: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  load: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    entities: state.works.entities,
    error: state.works.error,
    isFetching: state.works.isFetching,
    filter: state.works.filter,
  };
}

export default connect(mapStateToProps, {
  changeFilter,
  load,
  resetError,
})(WorksPosts);
