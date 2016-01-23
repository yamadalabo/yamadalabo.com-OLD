import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { loadSeminar, resetSeminar, resetErrorMessage } from '../actions';
import ArticleList from '../components/ArticleList';
import Article from '../components/Article';
import { SEMINAR } from '../constants/PageTypes';

export default class Seminar extends Component {
  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderSeminarSection = this.renderSeminarSection.bind(this);
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
      this.props.resetSeminar();
      this.props.loadSeminar();
    }
  }

  handleClick() {
    if (!this.props.isFetching) {
      this.props.loadSeminar();
    }
  }

  renderSeminarSection() {
    if (!this.props.routeParams.id) {
      return (
        <ArticleList
          pageType={SEMINAR}
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
          {this.renderSeminarSection()}
          {this.renderReloadButton()}
        </div>
      </div>
    );
  }
}

Seminar.propTypes = {
  routeParams: PropTypes.object,
  loadSeminar: PropTypes.func.isRequired,
  resetSeminar: PropTypes.func.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  entities: PropTypes.array.isRequired,
  updatedAt: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  shouldReload: PropTypes.bool.isRequired,
  errorMessage: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    entities: state.seminar.entities,
    updatedAt: state.seminar.updatedAt,
    isFetching: state.seminar.isFetching,
    shouldReload: state.seminar.shouldReload,
    errorMessage: state.errorMessage,
  };
}

export default connect(mapStateToProps, {
  loadSeminar,
  resetSeminar,
  resetErrorMessage,
})(Seminar);
