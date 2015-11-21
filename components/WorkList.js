import React from 'react'
import { WorkItem } from './WorkItem'

export const WorkList = ({works}) => {
  return (
  <div className="ui basic segment">
    <div className="ui stackable four column grid container">
      {works.map((work, i) => WorkItem(work, i))}
    </div>
  </div>
  )
}
