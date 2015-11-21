import React from 'react'

export const ErrorMessage = ({message}) => {
  return (
    <div className="ui basic center aligned segment">
      <div className="ui huge warning message">
        <div className="content">
          <div className="header">
            <i className="warning sign icon" />
            {message}
          </div>
        </div>
      </div>
    </div>
  )
}
