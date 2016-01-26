import React, { Component, PropTypes } from 'react';
import { PROFESSOR, GRADUATE } from '../constants/AuthorTypes';
import { PAPER, PROJECT_PAPER, GRADUATE_PAPER, BOOK, SPEAK, CONFERENCE, MEDIA, LECTURE, CONTRIBUTION, REWARD } from '../constants/WorkTypes';

export default class WorkNavigator extends Component {
  constructor(props) {
    super(props);
    this.handleSelectAuthor = this.handleSelectAuthor.bind(this);
    this.handleSelectWork = this.handleSelectWork.bind(this);
  }

  handleSelectAuthor(e) {
    e.stopPropagation();
    this.props.handleShowByAuthor(e.target.value);
  }

  handleSelectWork(e) {
    e.stopPropagation();
    this.props.handleShowByWork(e.target.value);
  }

  render() {
    return (
      <div className="block">
        <select
          className="select"
          onChange={this.handleSelectAuthor}
        >
          {
            [PROFESSOR, GRADUATE].map(author => {
              return (
                <option>{author}</option>
              );
            })
          }
        </select>
        <span> / </span>
        <select
          className="select"
          onChange={this.handleSelectWork}
        >
          {
            [PAPER, PROJECT_PAPER, GRADUATE_PAPER, BOOK, SPEAK, CONFERENCE, MEDIA, LECTURE, CONTRIBUTION, REWARD].map(work => {
              return (
                <option>{work}</option>
              );
            })
          }
        </select>
      </div>
    );
  }
}

WorkNavigator.propTypes = {
  handleShowByAuthor: PropTypes.func.isRequired,
  handleShowByWork: PropTypes.func.isRequired,
};
