import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import findIndex from 'lodash/array/findIndex';
import moment from 'moment';
import { loadNews, resetNews, resetErrorMessage } from '../actions';
import PageNavigator from '../components/PageNavigator';
import PostNavigator from '../components/PostNavigator';
import Posts from '../components/Posts';
import Post from '../components/Post';
import { NEWS } from '../constants/PageTypes';

export default class News extends Component {
  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderSection = this.renderSection.bind(this);
    this.renderReloadButton = this.renderReloadButton.bind(this);
  }

  componentDidMount() {
    this.handleLoad();
  }

  componentDidUpdate() {
    this.handleLoad();
  }

  handleLoad() {
    const updatedTime = moment.unix(this.props.updatedAt);
    const now = moment();
    if (this.props.errorMessage) {
      this.props.resetErrorMessage();
    }
    if (!this.props.isFetching && (this.props.updatedAt === null || now.diff(updatedTime, 'minutes') > 30)) {
      this.props.resetNews();
      this.props.loadNews();
    }
  }

  handleClick() {
    if (!this.props.isFetching) {
      this.props.loadNews();
    }
  }

  renderPostNavigator() {
    const { entities, isFetching, routeParams: { id } } = this.props;
    if (id && entities.length !== 0 && !isFetching) {
      const selectedIndex = findIndex(entities, entity => {
        return entity.id === parseInt(id, 10);
      });
      const prevEntity = entities[selectedIndex - 1];
      const nextEntity = entities[selectedIndex + 1];
      const prevPath = prevEntity ? `${NEWS}/${prevEntity.id}` : null;
      const nextPath = nextEntity ? `${NEWS}/${nextEntity.id}` : null;

      return (
        <PostNavigator
          prevPath={prevPath}
          nextPath={nextPath}
        />
      );
    }
  }

  renderSection() {
    if (!this.props.routeParams.id) {
      return (
        <Posts
          pagePath={NEWS}
          entities={this.props.entities}
        />
      );
    }

    const selectedPost = this.props.entities.find(entity => {
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

  renderReloadButton() {
    if (this.props.shouldReload && !this.props.routeParams.id) {
      return (
        <button onClick={this.handleClick}>
          RELOAD
        </button>
      );
    }
  }

  render() {
    return (
      <div className="app">
        <PageNavigator />
        {this.renderPostNavigator()}
        <div className="content">
          {this.renderSection()}
          {this.renderReloadButton()}
        </div>
      </div>
    );
  }
}

News.propTypes = {
  routeParams: PropTypes.object,
  loadNews: PropTypes.func.isRequired,
  resetNews: PropTypes.func.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  entities: PropTypes.array.isRequired,
  updatedAt: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  shouldReload: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    entities: state.news.entities,
    updatedAt: state.news.updatedAt,
    isFetching: state.news.isFetching,
    shouldReload: state.news.shouldReload,
    errorMessage: state.errorMessage,
  };
}

export default connect(mapStateToProps, {
  loadNews,
  resetNews,
  resetErrorMessage,
})(News);
