import React from 'react'
import { PAPER, PROJECT_PAPER, GRADUATE_PAPER, BOOK, SPEAK, CONFERENCE, MEDIA, LECTURE, CONTRIBUTION, REWARD } from '../constants/WorkTypes'

const WORK_ITEM_PROPS = {
  [PAPER]: {
    color: 'teal',
    icon: 'file text outline'
  },
  [PROJECT_PAPER]: {
    color: 'yellow',
    icon: 'file text outline'
  },
  [GRADUATE_PAPER]: {
    color: 'green',
    icon: 'file text outline'
  },
  [BOOK]: {
    color: 'olive',
    icon: 'book'
  },
  [SPEAK]: {
    color: 'violet',
    icon: 'announcement'
  },
  [CONFERENCE]: {
    color: 'pink',
    icon: 'announcement'
  },
  [MEDIA]: {
    color: 'blue',
    icon: 'newspaper'
  },
  [LECTURE]: {
    color: 'orange',
    icon: 'student'
  },
  [CONTRIBUTION]: {
    color: 'red',
    icon: 'write'
  },
  [REWARD]: {
    color: 'brown',
    icon: 'star'
  }
}

export const WorkItem = ({ title, body, type, date }, i) => {
  return (
    <div className="column">
      <div className="ui centered card">
        <div className="content">
          <div className="header">{title}</div>
        </div>
        <div className="content">
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
        <div className="extract content">
          <div className="right floated meta">
            <span className="data">
              {date.year() + '-' + (date.month() - 1)}
            </span>
          </div>
          <div className={`ui ${WORK_ITEM_PROPS[type].color} basic label`}>
            <i className={`${WORK_ITEM_PROPS[type].icon} icon`} />
            {type}
          </div>
        </div>
      </div>
    </div>
  )
}
