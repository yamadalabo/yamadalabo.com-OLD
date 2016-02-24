import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadWorks, changeWorksFilter, resetErrorMessage } from '../actions';
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
    this.handleLoad();
  }

  componentDidUpdate() {
    this.handleLoad();
  }

  handleLoad() {
    const { isFetching, entities } = this.props;
    if (!isFetching && entities.length === 0) {
      this.props.loadWorks();
    }
  }

  handleShowByWorksFilter(filter) {
    this.props.changeWorksFilter(filter);
  }

  renderMainSection() {
    const { isFetching, entities, filter } = this.props;
    const { shouldShowLoading } = this.state;
    if (isFetching || shouldShowLoading) {
      return (
        <Loading />
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
  loadWorks: PropTypes.func.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  entities: PropTypes.array.isRequired,
  updatedAt: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    entities: state.works.entities,
    updatedAt: state.works.updatedAt,
    isFetching: state.works.isFetching,
    filter: state.works.filter,
    errorMessage: state.errorMessage,
  };
}

export default connect(mapStateToProps, {
  loadWorks,
  changeWorksFilter,
  resetErrorMessage,
})(WorksPosts);
