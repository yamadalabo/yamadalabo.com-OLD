import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { loadNews, resetNews, resetErrorMessage } from '../actions';
import ArticleList from '../components/ArticleList';
import Article from '../components/Article';
import { NEWS } from '../constants/PageTypes';

export default class News extends Component {
  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderNewsSection = this.renderNewsSection.bind(this);
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

  renderNewsSection() {
    if (!this.props.routeParams.id) {
      return (
        <ArticleList
          pageType={NEWS}
          entities={this.props.entities}
        />
      );
    }

    const selectedArticle = this.props.entities.find(entity => {
      return entity.id === parseInt(this.props.routeParams.id, 10);
    });
    return (
      <Article
        title={selectedArticle.title}
        body={selectedArticle.body}
        timestamp={selectedArticle.timestamp}
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
      <div className="app-container">
        <div className="content">
          {this.renderNewsSection()}
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
