import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { load } from '../actions/async/news';
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

  componentDidMount() {
    setTimeout(() => {
      this.setState({ shouldShowLoading: false });
    }, 1000);
    // should reset error message
    this.props.load();
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
  load: PropTypes.func.isRequired,
  entities: PropTypes.array.isRequired,
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
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
})(NewsPosts);
