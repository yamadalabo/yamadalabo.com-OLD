import React, { Component } from 'react'
import { SHOW_ALL, SHOW_PAPER, SHOW_PROJECT_PAPER, SHOW_GRADUATE_PAPER, SHOW_BOOK, SHOW_SPEAK, SHOW_CONFERENCE, SHOW_MEDIA, SHOW_LECTURE, SHOW_CONTRIBUTION, SHOW_REWARD } from '../constants/WorkFilters'

const WORK_FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_PAPER]: 'Paper',
  [SHOW_PROJECT_PAPER]: 'Project paper',
  [SHOW_GRADUATE_PAPER]: 'Graduate paper',
  [SHOW_BOOK]: 'Book',
  [SHOW_SPEAK]: 'Speak',
  [SHOW_CONFERENCE]: 'Conference',
  [SHOW_MEDIA]: 'Media',
  [SHOW_LECTURE]: 'Lecture',
  [SHOW_CONTRIBUTION]: 'Contribution',
  [SHOW_REWARD]: 'Reward'
}

export default class WorkSelector extends Component {
  constructor(props, context) {
    super(props, context)
    this.change = this.change.bind(this)
  }

  componentDidMount() {
    $('.ui.dropdown').dropdown({
      onChange: this.change
    })
  } 

  componentDidUpdate() {
    $('.ui.dropdown').dropdown({
      onChange: this.change
    })
  }

  change(val) {
    this.props.onShow(val)
  }

  render() {
    const {filter: selectedFilter} = this.props

    return (
      <select
        className="ui selection dropdown"
        onChange={this.change}
        value={selectedFilter}
      >
        {[ SHOW_ALL, SHOW_PAPER, SHOW_PROJECT_PAPER, SHOW_GRADUATE_PAPER, SHOW_BOOK, SHOW_SPEAK, SHOW_CONFERENCE, SHOW_MEDIA, SHOW_LECTURE, SHOW_CONTRIBUTION, SHOW_REWARD ].map((filter, index)=> {
          return (
            <option value={filter} key={filter + index}>{WORK_FILTER_TITLES[filter]}</option>
          )
        })}
      </select>
    )
  }
}
