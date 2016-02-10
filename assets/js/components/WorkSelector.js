import React, { Component, PropTypes } from 'react';
import { PROFESSOR, GRADUATE } from '../constants/AuthorTypes';
import { PAPER, PROJECT_PAPER, GRADUATE_PAPER, BOOK, SPEAK,
         CONFERENCE, MEDIA, LECTURE, CONTRIBUTION, REWARD } from '../constants/WorkTypes';

export default class WorkSelector extends Component {
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
    const { selectedAuthor, selectedWork } = this.props;
    return (
      <div className="block">
        <select
          className="select"
          value={selectedAuthor}
          onChange={this.handleSelectAuthor}
        >
          {
            [PROFESSOR, GRADUATE].map(author =>
              <option value={author} key={author}>{author}</option>
            )
          }
        </select>
        <span> / </span>
        <select
          className="select"
          value={selectedWork}
          onChange={this.handleSelectWork}
        >
          {
            [PAPER, PROJECT_PAPER, GRADUATE_PAPER, BOOK, SPEAK,
             CONFERENCE, MEDIA, LECTURE, CONTRIBUTION, REWARD].map(work =>
              <option value={work} key={work}>{work}</option>
            )
          }
        </select>
      </div>
    );
  }
}

WorkSelector.propTypes = {
  handleShowByAuthor: PropTypes.func.isRequired,
  handleShowByWork: PropTypes.func.isRequired,
  selectedAuthor: PropTypes.string.isRequired,
  selectedWork: PropTypes.string.isRequired,
};
