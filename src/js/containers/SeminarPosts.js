import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import load from '../actions/async/seminar';
import { resetError } from '../actions/sync/seminar';
import PageNavigator from '../components/PageNavigator';
import Posts from '../components/Posts';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

class SeminarPosts extends Component {
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
    const { entities, error, isFetching } = this.props;
    if (error !== null) {
      this.props.resetError();
    }
    if (entities.length === 0 && !isFetching) {
      this.props.load();
    }
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

    return (
      <Posts
        pagePath="/seminar"
        entities={entities}
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

SeminarPosts.propTypes = {
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
    entities: state.seminar.entities,
    error: state.seminar.error,
    isFetching: state.seminar.isFetching,
  };
}

export default connect(mapStateToProps, {
  load,
  resetError,
})(SeminarPosts);
