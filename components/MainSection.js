import React, { Component, PropTypes } from 'react'
import { AuthorSelector } from '../components/AuthorSelector'
import WorkSelector from '../components/WorkSelector'
import { WorkList } from '../components/WorkList'
import { Loading } from '../components/Loading'
import { ErrorMessage } from '../components/ErrorMessage'
import { PROFESSOR, GRADUATE } from '../constants/AuthorTypes'
import { PAPER, PROJECT_PAPER, GRADUATE_PAPER, BOOK, SPEAK, CONFERENCE, MEDIA, LECTURE, CONTRIBUTION, REWARD } from '../constants/WorkTypes'
import { SHOW_PROFESSOR, SHOW_GRADUATE } from '../constants/AuthorFilters'
import { SHOW_ALL, SHOW_PAPER, SHOW_PROJECT_PAPER, SHOW_GRADUATE_PAPER, SHOW_BOOK, SHOW_SPEAK, SHOW_CONFERENCE, SHOW_MEDIA, SHOW_LECTURE, SHOW_CONTRIBUTION, SHOW_REWARD } from '../constants/WorkFilters' 

const AUTHOR_FILTERS = {
  [SHOW_PROFESSOR]: work => work.author.some(author => author === PROFESSOR),
  [SHOW_GRADUATE]: work => work.author.some(author => author === GRADUATE)
}

const WORK_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_PAPER]: work => work.type === PAPER,
  [SHOW_PROJECT_PAPER]: work => work.type === PROJECT_PAPER,
  [SHOW_GRADUATE_PAPER]: work => work.type === GRADUATE_PAPER,
  [SHOW_BOOK]: work => work.type === BOOK,
  [SHOW_SPEAK]: work => work.type === SPEAK,
  [SHOW_CONFERENCE]: work => work.type === CONFERENCE,
  [SHOW_MEDIA]: work => work.type === MEDIA,
  [SHOW_LECTURE]: work => work.type === LECTURE,
  [SHOW_CONTRIBUTION]: work => work.type === CONTRIBUTION,
  [SHOW_REWARD]: work => work.type === REWARD
}

export default class MainSection extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      authorFilter: SHOW_PROFESSOR,
      workFilter: SHOW_ALL
    }
    this.handleShowByAuthor = this.handleShowByAuthor.bind(this)
    this.handleShowByWork = this.handleShowByWork.bind(this)
  }

  handleShowByAuthor(authorFilter) {
    this.setState({authorFilter})
  }

  handleShowByWork(workFilter) {
    this.setState({workFilter})
  }

  renderWorkList() {
    const { works, isFetching, errorMessage } = this.props
    const { authorFilter, workFilter } = this.state

    if (isFetching) {
      return <Loading />
    }

    if (errorMessage) {
      return <ErrorMessage message={errorMessage} />
    }

    const filteredWorks = works.filter(AUTHOR_FILTERS[authorFilter])
                              .filter(WORK_FILTERS[workFilter])
                              .sort((a, b) => {
                                if (a.date < b.date) {
                                  return 1
                                } else if (a.date > b.date) {
                                  return -1
                                } else {
                                  return 0
                                }
                              })
    const noWorkMessage = 'No work'
    if (filteredWorks.length === 0) {
      return <ErrorMessage message={noWorkMessage} />
    }

    return (
      <WorkList works={filteredWorks} />
    )
  }

  render() {
    return (
      <div className="ui stackable container">
        <div className="ui basic segment">
          <AuthorSelector
            filter={this.state.authorFilter}
            onShow={this.handleShowByAuthor}
          />
          <WorkSelector
            filter={this.state.workFilter}
            onShow={this.handleShowByWork}
          />
        </div>
        <div className="ui basic segment">
          {this.renderWorkList()}
        </div>
      </div>
    )
  }
}

MainSection.propTypes = {
  works: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired
}
