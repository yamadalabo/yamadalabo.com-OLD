import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import load from '../actions/async/news';
import { resetError } from '../actions/sync/news';
import PageNavigator from '../components/PageNavigator';
import Posts from '../components/Posts';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

class NewsPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowLoading: true,
    };
  }

  async componentDidMount() {
    await setTimeout(() => {
      this.setState({ shouldShowLoading: false });
    }, 1000);
    this.props.resetError();
    await this.props.load();
  }

  renderMainSection() {
    const { isFetching, error, entities } = this.props;
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
    } else if (entities.length === 0) {
      return (
        <ErrorMessage
          message="No work found."
        />
      );
    }

    const sortedEntities = entities.sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return -1;
      } else if (a.timestamp < b.timestamp) {
        return 1;
      }
      return 0;
    });

    return (
      <Posts
        pagePath="/news"
        entities={sortedEntities}
      />
    );
  }

  render() {
    return (
      <div className="app">
        <PageNavigator />
        <div className="content">
          {this.renderMainSection()}
        </div>
      </div>
    );
  }
}

NewsPosts.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  load: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    entities: state.news.entities,
    error: state.news.error,
    isFetching: state.news.isFetching,
  };
}

export default connect(mapStateToProps, {
  load,
  resetError,
})(NewsPosts);
